export const SAVE_KEY='play-together-v1';
export const SAVE_VERSION=1;
export const defaultProgress=()=>({version:SAVE_VERSION,name:'Pip',avatar:'cat',muted:false,motion:true,taughtStage:0,skills:{},recent:[],art:[],stickers:[],sessions:[],updatedAt:null});
export const sessionId=()=>{const now=new Date();return `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}-${String(now.getDate()).padStart(2,'0')}`;};

// Validate a complete imported save before touching stored data; unknown or unsafe fields are never blindly assigned.
export function validateProgress(value){
 if(!value||typeof value!=='object'||value.version!==SAVE_VERSION)throw new Error('This is not a supported Play Together backup.');
 const safe=defaultProgress();
 if(typeof value.name!=='string'||value.name.length>24)throw new Error('The companion name is invalid.');
 safe.name=value.name; safe.avatar=['cat','bunny','bear'].includes(value.avatar)?value.avatar:'cat';
 safe.muted=value.muted===true;safe.motion=value.motion!==false;
 safe.taughtStage=Number.isInteger(value.taughtStage)?Math.max(0,Math.min(4,value.taughtStage)):0;
 if(!value.skills||typeof value.skills!=='object'||Array.isArray(value.skills))throw new Error('Learning progress is missing.');
 for(const [key,skill] of Object.entries(value.skills)){
  if(!['listening','spelling','number','patterns','storytelling','drawing'].includes(key))continue;
  if(!skill||!Array.isArray(skill.evidence)||skill.evidence.length>500)throw new Error('A learning record is invalid.');
  if(!skill.evidence.every(item=>item&&['independent','supported','revisit','skipped'].includes(item.result)&&typeof item.day==='string'&&/^\d{4}-\d{2}-\d{2}$/.test(item.day)&&typeof item.content==='string'&&item.content.length<100))throw new Error('An observation is invalid.');
  safe.skills[key]={level:Number.isInteger(skill.level)?Math.max(0,Math.min(4,skill.level)):0,evidence:skill.evidence.map(item=>({day:item.day,result:item.result,content:item.content})),override:skill.override===true};
 }
 if(!Array.isArray(value.recent)||!value.recent.every(item=>typeof item==='string'&&item.length<100))throw new Error('Recent activity data is invalid.');
 safe.recent=value.recent.slice(-30);
 safe.stickers=Array.isArray(value.stickers)?value.stickers.filter(item=>['star','flower','rocket','rainbow','heart','sun'].includes(item)).slice(0,6):[];
 safe.sessions=Array.isArray(value.sessions)?value.sessions.filter(item=>typeof item==='string'&&/^\d{4}-\d{2}-\d{2}$/.test(item)).slice(-365):[];
 safe.art=Array.isArray(value.art)?value.art.filter(item=>typeof item==='string'&&item.length<40).slice(-100):[];
 safe.updatedAt=typeof value.updatedAt==='string'?value.updatedAt:null;
 return safe;
}

export function loadProgress(storage){
 const raw=storage.getItem(SAVE_KEY);
 if(!raw)return defaultProgress();
 return validateProgress(JSON.parse(raw));
}

export function persistProgress(storage,progress){
 const safe=validateProgress({...progress,updatedAt:new Date().toISOString()});
 storage.setItem(SAVE_KEY,JSON.stringify(safe));return safe;
}

// Independent evidence must span multiple days and examples. Hints and same-day repeats cannot manufacture advancement.
export function recordObservation(progress,skillId,content,result,day=sessionId()){
 const copy=structuredClone(progress);
 const skill=copy.skills[skillId]||{level:0,evidence:[],override:false};
 skill.evidence.push({day,result,content});skill.evidence=skill.evidence.slice(-500);
 const lastAdvance=skill.evidence.findLastIndex(item=>item.content==='level-change');
 const recent=skill.evidence.slice(Math.max(lastAdvance+1,skill.evidence.length-8)), independent=recent.filter(item=>item.result==='independent');
 const ready=new Set(independent.map(item=>item.day)).size>=3&&new Set(independent.map(item=>item.content)).size>=3;
 if(ready&&!skill.override&&recent.filter(item=>item.result==='revisit').length<2){
  skill.level=Math.min(4,skill.level+1);skill.evidence.push({day,result:'skipped',content:'level-change'});
 }
 copy.skills[skillId]=skill;copy.recent=[...copy.recent,content].slice(-30);
 if(result!=='skipped'&&!copy.sessions.includes(day))copy.sessions.push(day);
 return copy;
}

export function levelFor(progress,skillId){return progress.skills[skillId]?.level||0;}
export function shuffled(items,random=Math.random){return items.map(value=>({value,key:random()})).sort((a,b)=>a.key-b.key).map(item=>item.value);}
export function chooseFresh(items,recent,random=Math.random){const fresh=items.filter(item=>!recent.includes(item.id));return shuffled(fresh.length?fresh:items,random)[0];}
export function dailyWorlds(progress){return ['sounds','words',progress.sessions.length%3===2?'shapes':'numbers','art'];}
