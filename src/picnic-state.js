import {PICNIC_WORDS,PICNIC_COUNTS,PICNIC_SHARES,PICNIC_DEMOS,picnicPaperSteps} from './picnic-content.js';
export const PICNIC_SCENES=['welcome','word','pack','share','paper','ending'];
export const PICNIC_DECORATIONS=['star','leaf','flower'];
const boundedInteger=(value,max)=>Number.isInteger(value)&&value>=0&&value<=max;
export const picnicWord=state=>PICNIC_WORDS.find(word=>word.id===state.wordId);
export const picnicCount=state=>PICNIC_COUNTS.find(count=>count.id===state.countId);
export const picnicShare=state=>PICNIC_SHARES.find(share=>share.id===state.shareId);
export const picnicNeedsDemo=state=>Object.hasOwn(PICNIC_DEMOS,state.scene)&&!state.completed.includes(state.scene)&&!(state.demonstrated||Object.keys(PICNIC_DEMOS)).includes(state.scene);

export function createPicnic(progress,random=Math.random,selectPractice=null){
 const pick=items=>items[Math.min(items.length-1,Math.floor(random()*items.length))];
 const choose=(items,skill)=>selectPractice?selectPractice(items.map(item=>({...item,id:`picnic-${item.id}`,sourceId:item.id})),skill).sourceId:pick(items).id;
 const eligible=PICNIC_WORDS.filter(word=>word.stage<=Math.min(progress.taughtStage,progress.skills.spelling?.level||0));
 return {version:1,scene:'welcome',wordId:choose(eligible,'spelling'),countId:choose(PICNIC_COUNTS,'number'),shareId:choose(PICNIC_SHARES,'operations'),
  sharing:(progress.skills.operations?.level||0)>=1,letters:[],basket:0,plates:[0,0],paperStep:0,paperVariant:'classic',paperDone:false,
  completed:[],support:[],help:0,demonstrated:[...(progress.picnic?.demonstrated||[])],demoStep:0,recorded:false,decoration:progress.picnic?.decoration||'star'};
}

// Validate cross-field invariants as well as types so imported snapshots cannot invent completed learning evidence.
export function validatePicnic(value){
 if(value===undefined||value===null)return null;
 if(!value||value.version!==1||!PICNIC_SCENES.includes(value.scene))throw new Error('The picnic save is not compatible.');
 if(!picnicWord(value)||!picnicCount(value)||!picnicShare(value))throw new Error('The picnic content is not recognised.');
 const word=picnicWord(value),total=picnicShare(value).total;
 if(!Array.isArray(value.letters)||value.letters.length>3||!value.letters.every(letter=>letter===''||word.bank.includes(letter)))throw new Error('The picnic letters are invalid.');
 if(!boundedInteger(value.basket,6)||!Array.isArray(value.plates)||value.plates.length!==2||!value.plates.every(count=>boundedInteger(count,total))||value.plates[0]+value.plates[1]>total)throw new Error('The picnic quantities are invalid.');
 if(value.paperVariant!==undefined&&!['classic','round'].includes(value.paperVariant))throw new Error('The picnic paper lesson is invalid.');
 if(!boundedInteger(value.paperStep,picnicPaperSteps(value).length-1)||!boundedInteger(value.help,3))throw new Error('The picnic step is invalid.');
 for(const key of ['sharing','paperDone','recorded'])if(typeof value[key]!=='boolean')throw new Error('The picnic status is invalid.');
 for(const key of ['completed','support'])if(!Array.isArray(value[key])||value[key].length>4||new Set(value[key]).size!==value[key].length||!value[key].every(scene=>['word','pack','share','paper'].includes(scene)))throw new Error('The picnic observations are invalid.');
 // Older saves resume their existing task without a new interruption; the example remains available on request.
 const demonstrated=value.demonstrated===undefined?Object.keys(PICNIC_DEMOS):value.demonstrated,demoStep=value.demoStep===undefined?0:value.demoStep;
 if(!Array.isArray(demonstrated)||demonstrated.length>3||new Set(demonstrated).size!==demonstrated.length||!demonstrated.every(scene=>Object.hasOwn(PICNIC_DEMOS,scene))||!boundedInteger(demoStep,2))throw new Error('The picnic demonstration is invalid.');
 if(!PICNIC_DECORATIONS.includes(value.decoration))throw new Error('The picnic decoration is invalid.');
 if(value.completed.includes('word')&&value.letters.join('')!==value.wordId)throw new Error('The completed picnic word does not match.');
 if(value.completed.includes('pack')&&value.basket!==picnicCount(value).total)throw new Error('The completed picnic basket does not match.');
 if(value.completed.includes('share')&&(!value.sharing||value.plates[0]!==total/2||value.plates[1]!==total/2))throw new Error('The completed picnic sharing does not match.');
 if(value.completed.includes('paper')!==value.paperDone)throw new Error('The picnic drawing observation does not match.');
 const position=PICNIC_SCENES.indexOf(value.scene);
 if(position>1&&!value.completed.includes('word')||position>2&&!value.completed.includes('pack')||position>3&&value.sharing&&!value.completed.includes('share'))throw new Error('An earlier picnic task is unfinished.');
 if(value.scene==='share'&&!value.sharing||value.recorded&&value.scene!=='ending')throw new Error('The picnic route is invalid.');
 return {version:1,scene:value.scene,wordId:value.wordId,countId:value.countId,shareId:value.shareId,sharing:value.sharing,
  letters:[...value.letters],basket:value.basket,plates:[...value.plates],paperStep:value.paperStep,paperVariant:value.paperVariant||'classic',paperDone:value.paperDone,
  completed:[...value.completed],support:[...value.support],help:value.help,demonstrated:[...demonstrated],demoStep,recorded:value.recorded,decoration:value.decoration};
}

// A pure transition function keeps double clicks, help, and restoration independent of animation and browser timing.
export function updatePicnic(state,action,value){
 const next=structuredClone(state),scene=next.scene,finished=next.completed.includes(scene);
 const support=()=>{if(!next.support.includes(scene))next.support.push(scene);};
 if(action==='demo-open'&&Object.hasOwn(PICNIC_DEMOS,scene)&&!finished){
  next.demonstrated=(next.demonstrated||Object.keys(PICNIC_DEMOS)).filter(item=>item!==scene);next.demoStep=0;
  return validatePicnic(next);
 }
 if(picnicNeedsDemo(next)){
  if(action==='demo-next')next.demoStep=Math.min(2,next.demoStep+1);
  if(action==='demo-prev')next.demoStep=Math.max(0,next.demoStep-1);
  if(action==='demo-done'){next.demonstrated.push(scene);next.demoStep=0;}
  return validatePicnic(next);
 }
 if(action==='next'){
  if(scene==='welcome')next.scene='word';
  else if(finished&&scene==='word')next.scene='pack';
  else if(finished&&scene==='pack')next.scene=next.sharing?'share':'paper';
  else if(finished&&scene==='share')next.scene='paper';
  next.help=0;next.demoStep=0;
 }
 if(scene==='word'&&!finished){
  if(action==='letter'&&picnicWord(next).bank.includes(value)){
   const empty=next.letters.indexOf('');
   if(empty>=0)next.letters[empty]=value;else if(next.letters.length<3)next.letters.push(value);
  }
  if(action==='clear-letter'&&boundedInteger(Number(value),2)&&Number(value)<next.letters.length)next.letters[Number(value)]='';
  if(action==='undo')next.letters.pop();
  if(action==='check'){if(next.letters.join('')===next.wordId)next.completed.push('word');else support();}
 }
 if(scene==='pack'&&!finished){
  if(action==='add')next.basket=Math.min(6,next.basket+1);
  if(action==='remove')next.basket=Math.max(0,next.basket-1);
  if(action==='check'){if(next.basket===picnicCount(next).total)next.completed.push('pack');else support();}
 }
 if(scene==='share'&&!finished){
  const plate=Number(value),total=picnicShare(next).total;
  if([0,1].includes(plate)&&action==='plate-add'&&next.plates[0]+next.plates[1]<total)next.plates[plate]++;
  if([0,1].includes(plate)&&action==='plate-remove')next.plates[plate]=Math.max(0,next.plates[plate]-1);
  if(action==='check'){if(next.plates.every(count=>count===total/2))next.completed.push('share');else support();}
 }
 if(action==='help'&&['word','pack','share'].includes(scene)&&!finished){
  support();next.help=Math.min(3,next.help+1);
  if(next.help>1&&scene==='word'){
   const index=picnicWord(next).letters.findIndex((letter,index)=>next.letters[index]!==letter);
   if(index>=0)next.letters[index]=picnicWord(next).letters[index];
  }
  if(next.help>1&&scene==='pack')next.basket+=Math.sign(picnicCount(next).total-next.basket);
  if(next.help>1&&scene==='share'){
   const half=picnicShare(next).total/2,excess=next.plates.findIndex(count=>count>half);
   if(excess>=0)next.plates[excess]--;
   else{const fewer=next.plates[0]<=next.plates[1]?0:1;if(next.plates[fewer]<half)next.plates[fewer]++;}
  }
 }
 if(scene==='paper'){
  if(action==='paper-next')next.paperStep=Math.min(picnicPaperSteps(next).length-1,next.paperStep+1);
  if(action==='paper-prev')next.paperStep=Math.max(0,next.paperStep-1);
  if(action==='paper-switch'){next.paperVariant=next.paperVariant==='round'?'classic':'round';next.paperStep=0;}
  if(action==='paper-done'){next.paperDone=true;next.completed.push('paper');next.scene='ending';}
  if(action==='paper-skip')next.scene='ending';
 }
 if(action==='decorate'&&scene==='ending'&&PICNIC_DECORATIONS.includes(value))next.decoration=value;
 return validatePicnic(next);
}

export function picnicObservations(state){
 if(state.recorded||state.scene!=='ending')return [];
 const observations=[{skill:'spelling',content:`picnic-${state.wordId}`},{skill:'number',content:`picnic-${state.countId}`}];
 if(state.sharing)observations.push({skill:'operations',content:`picnic-${state.shareId}`});
 if(state.paperDone)observations.push({skill:'drawing',content:state.paperVariant==='round'?'picnic-lantern-round':'picnic-lantern'});
 return observations;
}
