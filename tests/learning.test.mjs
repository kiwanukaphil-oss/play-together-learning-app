import test from 'node:test';
import assert from 'node:assert/strict';
import {defaultProgress,validateProgress,validateResume,recordObservation,persistProgress,loadProgress,chooseFresh,choosePracticeItem} from '../src/learning.js';
import {WORDS,STORIES,SOUND_GROUPS,BOOKS} from '../src/content.js';
import {DRAWINGS} from '../src/drawing.js';
import {LETTER_MODELS,letterSvg} from '../src/handwriting.js';

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
test('letter models have valid start points and all 26 lowercase letters',()=>{
 assert.equal(Object.keys(LETTER_MODELS).join(''),'abcdefghijklmnopqrstuvwxyz');
 for(const [letter,strokes] of Object.entries(LETTER_MODELS))for(let index=0;index<strokes.length;index++){
  assert.match(strokes[index],/^M\d+ \d+/);assert.ok(!letterSvg(letter,index).includes('undefined'));
 }
});
test('little books disclose special words and keep the starter book within starter sounds',()=>{
 assert.equal(BOOKS.length,6);
 for(const book of BOOKS){assert.equal(book.pages.length,3);if(book.stage===0)assert.match(book.pages.map(page=>page[1]).join('').toLowerCase(),/^[satpinm .]+$/);}
 assert.ok(BOOKS.find(book=>book.id==='fish-dish').specialWords.includes('a'));
});
test('gallery rejects arbitrary URLs and oversized data while preserving valid small JPEG data',()=>{
 const valid={...defaultProgress(),pictures:[{id:'sample-1',image:'data:image/jpeg;base64,/9j/AA=='}]};
 assert.equal(validateProgress(valid).pictures.length,1);
 assert.throws(()=>validateProgress({...valid,pictures:[{id:'x',image:'https://external.example/image.jpg'}]}));
 assert.throws(()=>validateProgress({...valid,pictures:[{id:'x',image:'data:image/jpeg;base64,'+'a'.repeat(250000)}]}));
});
test('due reviews return supported words sooner and exclude examples already used in the current session',()=>{
 const pool=[{id:'a'},{id:'b'},{id:'c'}];
 let progress=recordObservation(defaultProgress(),'spelling','a','supported','2026-10-18');
 progress=recordObservation(progress,'spelling','b','independent','2026-10-18');
 assert.equal(choosePracticeItem(pool,progress,'spelling',[],'2026-10-19',()=>.5).id,'a');
 assert.equal(choosePracticeItem(pool,progress,'spelling',['a'],'2026-10-19',()=>.5).id,'c');
});
test('unfinished activities restore only compatible modes, positions and bounded observations',()=>{
 const valid={version:1,world:'words',mode:'build',round:2,evidence:[{content:'word-sat',supported:true}]};
 assert.deepEqual(validateResume(valid),valid);
 assert.throws(()=>validateResume({...valid,mode:'execute'}));
 assert.throws(()=>validateResume({...valid,round:99}));
 assert.throws(()=>validateResume({...valid,evidence:[{content:'x',supported:'yes'}]}));
});
