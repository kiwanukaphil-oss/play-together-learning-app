import {PICNIC_SOUND_CLIPS} from './picnic-sound-clips.js';

// Ambience sits well beneath speech and drops further while Pip or Bear talks.
const AMBIENCE_LEVEL=.55,AMBIENCE_DUCKED=.12,EFFECT_LEVEL=.8;

// Choose the sound that matches what visibly changed; mistakes stay silent so feedback never sounds like failure.
export function picnicSoundFor(before,after,action){
 if(action==='letter')return 'tile-place';
 if(action==='clear-letter'||action==='undo')return 'tile-lift';
 if(action==='add')return after.basket>before.basket?'apple-basket':null;
 if(action==='remove'||action==='plate-remove')return 'apple-lift';
 if(action==='plate-add')return 'apple-plate';
 if(action==='check'&&!before.completed.includes(before.scene)&&after.completed.includes(after.scene))return after.scene==='word'?'reveal':'success';
 if(action==='paper-done')return 'success';
 if(action==='paper-next'||action==='paper-prev')return 'paper-turn';
 if(action==='decorate')return 'sparkle';
 if(after.scene!==before.scene)return after.scene==='ending'?'ending':'whoosh';
 return null;
}

// Effects and ambience share one Web Audio graph; anything unavailable (no file, no Web Audio, blocked start) stays silent.
export function createPicnicSound({environment=globalThis,clips=PICNIC_SOUND_CLIPS,settings=()=>({muted:false,effects:true,ambience:true})}={}){
 let context=null,effectsGain=null,ambienceGain=null,ambienceSource=null,ducked=false;
 const buffers=new Map();
 const ensureContext=()=>{
  const AudioContext=environment.AudioContext||environment.webkitAudioContext;
  if(!AudioContext)return null;
  if(!context){
   context=new AudioContext();
   effectsGain=context.createGain();effectsGain.gain.value=EFFECT_LEVEL;effectsGain.connect(context.destination);
   ambienceGain=context.createGain();ambienceGain.gain.value=0;ambienceGain.connect(context.destination);
  }
  if(context.state==='suspended')context.resume().catch(()=>{});
  return context;
 };
 const loadBuffer=name=>{
  if(!clips[name])return Promise.resolve(null);
  if(!buffers.has(name))buffers.set(name,environment.fetch(clips[name].file)
   .then(response=>response.ok?response.arrayBuffer():Promise.reject(new Error(response.status)))
   .then(data=>context.decodeAudioData(data)).catch(()=>null));
  return buffers.get(name);
 };
 const rampTo=(gain,value,seconds)=>{
  const now=context.currentTime;gain.gain.cancelScheduledValues(now);gain.gain.setValueAtTime(gain.gain.value,now);gain.gain.linearRampToValueAtTime(value,now+seconds);
 };
 const effect=name=>{
  const {muted,effects}=settings();
  if(!name||muted||!effects||!clips[name]||!ensureContext())return;
  loadBuffer(name).then(buffer=>{
   if(!buffer)return;
   const source=context.createBufferSource();source.buffer=buffer;source.connect(effectsGain);source.start();
  });
 };
 const stopAmbience=()=>{
  if(!ambienceSource)return;
  const source=ambienceSource;ambienceSource=null;
  rampTo(ambienceGain,0,.6);setTimeout(()=>{try{source.stop();}catch{}},700);
 };
 // Start the loop once per visit; repeated calls while it plays are harmless.
 const startAmbience=()=>{
  const {muted,ambience}=settings();
  if(muted||!ambience){stopAmbience();return;}
  if(ambienceSource||!clips.ambience||!ensureContext())return;
  const source=context.createBufferSource();source.loop=true;source.connect(ambienceGain);ambienceSource=source;
  loadBuffer('ambience').then(buffer=>{
   if(!buffer||ambienceSource!==source)return;
   source.buffer=buffer;source.start();rampTo(ambienceGain,ducked?AMBIENCE_DUCKED:AMBIENCE_LEVEL,1.5);
  });
 };
 const duck=speaking=>{
  ducked=!!speaking;
  if(ambienceSource&&context)rampTo(ambienceGain,ducked?AMBIENCE_DUCKED:AMBIENCE_LEVEL,.3);
 };
 return {effect,startAmbience,stopAmbience,duck,get ambiencePlaying(){return !!ambienceSource;}};
}
