import test from 'node:test';
import assert from 'node:assert/strict';
import {createPicnic,updatePicnic,validatePicnic,picnicCount,picnicShare,picnicObservations} from '../src/picnic-state.js';
import {defaultProgress,validateProgress,recordObservation} from '../src/learning.js';
import {PICNIC_LINES,PICNIC_WORDS,PICNIC_COUNTS} from '../src/picnic-content.js';
import {createPicnicAudio} from '../src/picnic-audio.js';
import {renderPicnic,picnicInstruction} from '../src/picnic-view.js';

function finishPicnicTask(state){
 if(state.scene==='word')for(const letter of state.wordId)state=updatePicnic(state,'letter',letter);
 if(state.scene==='pack')while(state.basket<picnicCount(state).total)state=updatePicnic(state,'add');
 if(state.scene==='share')for(const plate of [0,1])for(let count=0;count<picnicShare(state).total/2;count++)state=updatePicnic(state,'plate-add',plate);
 return updatePicnic(state,'check');
}

// Walk three authored routes and confirm backup restoration retains all task and support state before recording once.
test('three complete picnic routes retain partial work, honour sharing level, and record supported evidence once',()=>{
 for(const random of [0,.4,.99]){
  let progress=defaultProgress();progress.skills.operations={level:1,evidence:[],override:true};
  let state=updatePicnic(createPicnic(progress,()=>random),'next');
  state=updatePicnic(state,'letter',state.wordId[0]);
  progress.picnic=state;state=validateProgress(JSON.parse(JSON.stringify(progress))).picnic;
  assert.equal(state.letters[0],state.wordId[0]);state=updatePicnic(state,'undo');
  for(const scene of ['word','pack','share']){assert.equal(state.scene,scene);state=updatePicnic(finishPicnicTask(state),'next');}
  assert.equal(state.scene,'paper');state=updatePicnic(state,'paper-done');
  const observations=picnicObservations(state);assert.deepEqual(observations.map(item=>item.skill),['spelling','number','operations','drawing']);
  progress.picnic=state;for(const item of observations)progress=recordObservation(progress,item.skill,item.content,'supported');
  progress.picnic.recorded=true;progress=validateProgress(JSON.parse(JSON.stringify(progress)));
  assert.equal(picnicObservations(progress.picnic).length,0);
  assert.ok(Object.values(progress.skills).every(skill=>skill.evidence.every(item=>item.result==='supported')));
 }
});

test('help changes only the next needed letter and keeps valid letters; individual spaces can be edited',()=>{
 let state=updatePicnic(createPicnic(defaultProgress(),()=>0),'next');
 for(const letter of ['s','a','p'])state=updatePicnic(state,'letter',letter);
 state=updatePicnic(state,'check');assert.deepEqual(state.support,['word']);assert.equal(state.completed.length,0);
 state=updatePicnic(state,'help');assert.equal(state.letters.join(''),'sap');
 state=updatePicnic(state,'help');assert.equal(state.letters.join(''),'map');
 state=updatePicnic(state,'clear-letter',0);assert.deepEqual(state.letters,['','a','p']);
 state=updatePicnic(state,'letter','m');assert.equal(state.letters.join(''),'map');
});

test('counting and sharing help model one action, enforce totals, and require an explicit check',()=>{
 const progress=defaultProgress();progress.skills.operations={level:1};
 let state=updatePicnic(finishPicnicTask(updatePicnic(createPicnic(progress,()=>.99),'next')),'next');
 state=updatePicnic(state,'help');assert.equal(state.basket,0);
 state=updatePicnic(state,'help');assert.equal(state.basket,1);assert.equal(state.completed.includes('pack'),false);
 state=updatePicnic(finishPicnicTask(state),'next');
 for(let index=0;index<8;index++)state=updatePicnic(state,'plate-add',0);
 assert.deepEqual(state.plates,[6,0]);
 state=updatePicnic(state,'check');assert.equal(state.completed.includes('share'),false);
 state=updatePicnic(updatePicnic(state,'help'),'help');assert.deepEqual(state.plates,[5,0]);
 assert.deepEqual(state.support,['pack','share']);
});

test('starter route skips sharing; skipped paper is not recorded; unsupported imports cannot fabricate success',()=>{
 let state=createPicnic(defaultProgress(),()=>0);
 assert.equal(state.sharing,false);state=updatePicnic(state,'next');
 state=updatePicnic(finishPicnicTask(state),'next');
 state=updatePicnic(finishPicnicTask(state),'next');assert.equal(state.scene,'paper');
 state=updatePicnic(state,'paper-skip');assert.deepEqual(picnicObservations(state).map(item=>item.skill),['spelling','number']);
 for(const alteration of [{basket:99},{scene:'share'},{letters:['<img>']},{recorded:'yes'},{plates:[3,3]},{completed:[]}]){
  assert.throws(()=>validatePicnic({...state,...alteration}));
 }
 assert.equal(validateProgress({...defaultProgress(),picnic:undefined}).picnic,null);
});

test('authored starter words and quantities have matching whole-word instruction scripts; no phoneme TTS',()=>{
 for(const word of PICNIC_WORDS){assert.match(word.id,/^[satpinm]+$/);assert.equal(word.letters.join(''),word.id);assert.ok(PICNIC_LINES[`word-${word.id}`]);assert.ok(PICNIC_LINES[`word-success-${word.id}`]);}
 assert.deepEqual([...new Set(PICNIC_COUNTS.map(item=>item.total))].sort(),[1,2,3,4,5]);
 for(const item of PICNIC_COUNTS)assert.ok(PICNIC_LINES[`pack-${item.id}`].text.includes(String(item.total)));
 assert.ok(Object.values(PICNIC_LINES).every(line=>line.review==='draft'&&line.file===null));
});

test('spelling view does not print the target word before completion and sharing identifies its new supply',()=>{
 const state=updatePicnic(createPicnic(defaultProgress(),()=>0),'next');
 const rendered=renderPicnic(state);
 assert.ok(!rendered.includes('Let’s make map'));assert.ok(rendered.includes('data-action="picnic-word-listen"'));
 const share={...state,scene:'share'};assert.match(PICNIC_LINES[picnicInstruction(share)].text,/I brought 2 more apples/);
});

test('simpler paper lesson resets its step, survives backup, and preserves its specific observation identity',()=>{
 let state=updatePicnic(createPicnic(defaultProgress(),()=>0),'next');
 state=updatePicnic(finishPicnicTask(state),'next');state=updatePicnic(finishPicnicTask(state),'next');
 state=updatePicnic(state,'paper-next');state=updatePicnic(state,'paper-switch');
 assert.equal(state.paperVariant,'round');assert.equal(state.paperStep,0);
 state=validatePicnic(JSON.parse(JSON.stringify(state)));
 for(let index=0;index<4;index++)state=updatePicnic(state,'paper-next');
 assert.equal(state.paperStep,2);
 state=updatePicnic(state,'paper-done');assert.equal(picnicObservations(state).at(-1).content,'picnic-lantern-round');
});

test('audio replay cancels previous speech, mute stays silent, and late callbacks cannot revive a stopped character',()=>{
 const spoken=[],speakers=[];let cancels=0;
 const environment={SpeechSynthesisUtterance:class{constructor(text){this.text=text;}},speechSynthesis:{cancel(){cancels++;},getVoices(){return [];},speak(value){spoken.push(value);}}};
 const audio=createPicnicAudio({environment,onSpeaking:speaker=>speakers.push(speaker)});
 audio.play('welcome');const first=spoken[0];audio.play('share');first.onstart();
 assert.equal(speakers.at(-1),null);spoken[1].onstart();assert.equal(speakers.at(-1),'bear');
 audio.stop();spoken[1].onend();assert.equal(speakers.at(-1),null);
 audio.play('welcome',{muted:true});assert.equal(spoken.length,2);assert.equal(cancels,4);
});
