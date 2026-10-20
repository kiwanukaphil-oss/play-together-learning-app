import test from 'node:test';
import assert from 'node:assert/strict';
import {existsSync} from 'node:fs';
import {createPicnicAudio,mouthOpenness} from '../src/picnic-audio.js';
import {createPicnicSound,picnicSoundFor} from '../src/picnic-sound.js';
import {PICNIC_SOUND_CLIPS} from '../src/picnic-sound-clips.js';
import {PICNIC_LINES} from '../src/picnic-content.js';
import {defaultProgress,validateProgress} from '../src/learning.js';

test('mouth openness reads the 25 fps envelope and closes outside it',()=>{
 assert.equal(mouthOpenness('0918',0),0);assert.equal(mouthOpenness('0918',.04),1);assert.equal(mouthOpenness('0918',.12),8/9);
 assert.equal(mouthOpenness('0918',5),0);assert.equal(mouthOpenness(undefined,1),0);
});

// A fake clock lets the test advance playback and animation frames deterministically.
test('the speaking character mouth follows the clip and closes when replay or stop interrupts it',()=>{
 const frames=[],mouths=[];let clip;
 const environment={
  Audio:class{constructor(src){this.src=src;this.currentTime=0;clip=this;}play(){return Promise.resolve();}pause(){}removeAttribute(){}},
  requestAnimationFrame:callback=>frames.push(callback),cancelAnimationFrame:()=>{},
 };
 const welcome=PICNIC_LINES.welcome,original={...welcome};
 try{
  Object.assign(welcome,{file:'./assets/picnic/voice/welcome.mp3',review:'produced-auto-checked',mouth:'0099'});
  const audio=createPicnicAudio({environment,onMouth:(speaker,openness)=>mouths.push([speaker,openness])});
  audio.play('welcome');clip.currentTime=.09;frames.shift()();
  assert.deepEqual(mouths.at(-1),['bear',1]);
  const staleFrame=frames.shift();audio.stop();assert.deepEqual(mouths.at(-1),[null,0]);
  const count=mouths.length;staleFrame();assert.equal(mouths.length,count,'a stale frame cannot reopen the mouth');
 }finally{Object.assign(welcome,original);}
});

test('sounds match visible changes and mistakes stay silent',()=>{
 const word={scene:'word',completed:[],basket:0};
 assert.equal(picnicSoundFor(word,word,'letter'),'tile-place');
 assert.equal(picnicSoundFor(word,word,'undo'),'tile-lift');
 assert.equal(picnicSoundFor(word,word,'check'),null);
 assert.equal(picnicSoundFor(word,{...word,completed:['word']},'check'),'reveal');
 const pack={scene:'pack',completed:['word'],basket:2};
 assert.equal(picnicSoundFor(pack,{...pack,basket:3},'add'),'apple-basket');
 assert.equal(picnicSoundFor(pack,{...pack,basket:1},'remove'),'apple-lift');
 assert.equal(picnicSoundFor(pack,{...pack,completed:['word','pack']},'check'),'success');
 assert.equal(picnicSoundFor(pack,{...pack,scene:'paper'},'next'),'whoosh');
 assert.equal(picnicSoundFor({...pack,scene:'paper'},{...pack,scene:'ending'},'next'),'ending');
 assert.equal(picnicSoundFor(pack,pack,'help'),null);
});

// Minimal Web Audio stand-in that records sources and gain targets.
function fakeAudioEnvironment(){
 const started=[],fetched=[];
 class Gain{constructor(){this.gain={value:1,targets:[],cancelScheduledValues(){},setValueAtTime(){},linearRampToValueAtTime(value){this.targets.push(value);this.value=value;}};}connect(){}}
 class Source{connect(){}start(){started.push(this);}stop(){this.stopped=true;}}
 const environment={
  AudioContext:class{constructor(){this.state='running';this.currentTime=0;this.destination={};}createGain(){return new Gain();}createBufferSource(){return new Source();}decodeAudioData(){return Promise.resolve({decoded:true});}},
  fetch:url=>{fetched.push(url);return Promise.resolve({ok:true,arrayBuffer:()=>Promise.resolve(new ArrayBuffer(8))});},
 };
 return {environment,started,fetched};
}
const flush=()=>new Promise(resolve=>setTimeout(resolve,0));
const clips={'apple-basket':{file:'./assets/picnic/sound/apple-basket.mp3'},ambience:{file:'./assets/picnic/sound/ambience.mp3'}};

test('effects respect mute and the parent setting; unknown sounds are ignored',async()=>{
 const {environment,started,fetched}=fakeAudioEnvironment();let current={muted:false,effects:true,ambience:true};
 const sound=createPicnicSound({environment,clips,settings:()=>current});
 sound.effect('apple-basket');await flush();assert.equal(started.length,1);
 sound.effect('missing-sound');await flush();assert.equal(started.length,1);
 current={...current,muted:true};sound.effect('apple-basket');
 current={muted:false,effects:false,ambience:true};sound.effect('apple-basket');await flush();
 assert.equal(started.length,1);assert.deepEqual(fetched,['./assets/picnic/sound/apple-basket.mp3'],'decoded sounds are reused');
});

test('ambience loops once, ducks under speech, and stops when switched off',async()=>{
 const {environment,started}=fakeAudioEnvironment();let current={muted:false,effects:true,ambience:true};
 const sound=createPicnicSound({environment,clips,settings:()=>current});
 sound.startAmbience();sound.startAmbience();await flush();
 assert.equal(started.length,1);assert.ok(started[0].loop);assert.ok(sound.ambiencePlaying);
 sound.duck('bear');sound.duck(null);
 current={...current,ambience:false};sound.startAmbience();assert.equal(sound.ambiencePlaying,false);
});

test('no Web Audio support leaves the picnic silent instead of failing',()=>{
 const sound=createPicnicSound({environment:{},clips,settings:()=>({muted:false,effects:true,ambience:true})});
 sound.effect('apple-basket');sound.startAmbience();sound.duck('pip');assert.equal(sound.ambiencePlaying,false);
});

test('sound settings default on, survive backups, and older saves gain them',()=>{
 const progress=defaultProgress();assert.equal(progress.effects,true);assert.equal(progress.ambience,true);
 assert.equal(validateProgress({...progress,effects:false}).effects,false);
 const older={...progress};delete older.effects;delete older.ambience;
 assert.equal(validateProgress(older).ambience,true);
});

test('every bundled sound file exists',()=>{
 for(const [name,clip] of Object.entries(PICNIC_SOUND_CLIPS)){assert.equal(clip.file,`./assets/picnic/sound/${name}.mp3`);assert.ok(existsSync(clip.file),name);}
});
