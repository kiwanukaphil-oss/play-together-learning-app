import test from 'node:test';
import assert from 'node:assert/strict';
import {defaultProgress,validateProgress,recordObservation,persistProgress,loadProgress,chooseFresh} from '../src/learning.js';
import {WORDS,STORIES,SOUND_GROUPS} from '../src/content.js';
import {DRAWINGS} from '../src/drawing.js';

test('same-day repeats never advance a skill',()=>{
 let progress=defaultProgress();
 for(let index=0;index<12;index++)progress=recordObservation(progress,'number',`count-${index}`,'independent','2026-10-19');
 assert.equal(progress.skills.number.level,0);
});
test('different days and examples advance only the relevant strand, then require new evidence',()=>{
 let progress=defaultProgress();
 for(let index=0;index<3;index++)progress=recordObservation(progress,'number',`count-${index}`,'independent',`2026-10-${19+index}`);
 assert.equal(progress.skills.number.level,1);assert.equal(progress.skills.spelling,undefined);
 progress=recordObservation(progress,'number','count-new','independent','2026-10-22');
 assert.equal(progress.skills.number.level,1);
});
test('supported, skipped, and parent-set levels do not automatically advance',()=>{
 let progress=defaultProgress();
 for(let index=0;index<5;index++)progress=recordObservation(progress,'spelling',`word-${index}`,'supported',`2026-10-${19+index}`);
 assert.equal(progress.skills.spelling.level,0);
 progress.skills.spelling.override=true;
 for(let index=0;index<5;index++)progress=recordObservation(progress,'spelling',`new-${index}`,'independent',`2026-10-${19+index}`);
 assert.equal(progress.skills.spelling.level,0);
 const skipped=recordObservation(defaultProgress(),'number','count-1','skipped','2026-10-19');assert.equal(skipped.sessions.length,0);
});
test('backup round trip preserves progress and rejects incompatible data before writing',()=>{
 const storage={value:null,getItem(){return this.value;},setItem(key,value){this.value=value;}};
 const saved=persistProgress(storage,recordObservation(defaultProgress(),'number','count-3','supported'));
 assert.deepEqual(loadProgress(storage),saved);
 const before=storage.value;assert.throws(()=>persistProgress(storage,{...saved,version:99}));assert.equal(storage.value,before);
 assert.throws(()=>validateProgress({...saved,skills:{number:{evidence:[{result:'wrong',day:'bad',content:'x'}]}}}));
 assert.throws(()=>validateProgress({...saved,name:'x'.repeat(25)}));
});
test('content IDs are unique, graphemes reconstruct words, and starter words use only starter sounds',()=>{
 assert.equal(new Set(WORDS.map(item=>item.id)).size,WORDS.length);
 for(const item of WORDS){assert.equal(item.graphemes.join(''),item.word);if(item.stage===0)assert.match(item.word,/^[satpinm]+$/);}
 for(const group of SOUND_GROUPS)assert.equal(group.items.length,3);
});
test('drawing and story collections are complete enough to navigate',()=>{
 assert.equal(DRAWINGS.length,15);assert.equal(new Set(DRAWINGS.map(item=>item.id)).size,15);
 for(const drawing of DRAWINGS){assert.ok(drawing.steps.length>=4);for(const step of drawing.steps){assert.equal(step.length,2);assert.ok(step[0].length>5);assert.match(step[1],/^</);}}
 for(const story of STORIES)assert.equal(story.frames.length,3);
});
test('fresh selection avoids recent examples until the pool is exhausted',()=>{
 const pool=[{id:'a'},{id:'b'},{id:'c'}];assert.equal(chooseFresh(pool,['a','b'],()=>.5).id,'c');assert.ok(chooseFresh(pool,['a','b','c']));
});
