// Produce direction-version-2 Pip/Bear takes through the ElevenLabs API and verify what each take actually says.
// Usage: node scripts/generate-picnic-voices.mjs [--dry-run] [--verify-only] [--retake id,id]
// The API key is read from the gitignored .env (ELEVENLABS_API_KEY) and is never written to disk or logs.
import {mkdir,readFile,writeFile,copyFile,access} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {PICNIC_LINES} from '../src/picnic-content.js';

const OUTPUT='output/voice-revised';
const ORIGINALS=`${OUTPUT}/originals`;
const LOG_FILE=`${OUTPUT}/generation-log.json`;
const ENERGY_REVIEW='output/voice-energy-review/originals';
const API='https://api.elevenlabs.io/v1';
const VOICES={pip:{name:'Tamsin',voiceId:'dAlhI9qAHVIjXuVppzhW'},bear:{name:'Mike',voiceId:'FZQ5wG88XQUxYZLhe3dp'}};
// Matches the displayed UI values used for the auditions, first batch and accepted energy samples.
const VOICE_SETTINGS={stability:.5,similarity_boost:.75};
const NUMBER_WORDS=['zero','one','two','three','four','five','six','seven','eight','nine','ten'];

const args=process.argv.slice(2);
const dryRun=args.includes('--dry-run'),verifyOnly=args.includes('--verify-only');
const retakeArgument=args.includes('--retake')?args[args.indexOf('--retake')+1]??'':'';
const retakeIds=new Set(retakeArgument.split(',').filter(Boolean));

const sha256=value=>createHash('sha256').update(value).digest('hex');
// Re-copying an unchanged file keeps its earlier transcript evidence; a changed file must be verified again.
const keepVerifiedCopy=(previous,next)=>previous?.originalSha256===next.originalSha256?{...previous,...next}:next;
const exists=path=>access(path).then(()=>true,()=>false);

// Reduce text to comparable spoken words: drop delivery tags, unify apostrophes and spell out numerals.
function spokenWords(text){
 return text.replace(/\[[^\]]*\]/g,' ').replace(/[’‘]/g,"'").toLowerCase()
  .replace(/\d+/g,digits=>NUMBER_WORDS[Number(digits)]??digits)
  .replace(/[^a-z' ]+/g,' ').split(/\s+/).map(word=>word.replace(/^'+|'+$/g,'')).filter(Boolean);
}

// Refuse to spend credits unless every runtime line has a direction whose words match the runtime caption exactly.
async function loadCheckedDirection(){
 const direction=JSON.parse(await readFile('docs/PICNIC_VOICE_DIRECTION_V2.json','utf8'));
 const runtimeIds=Object.keys(PICNIC_LINES),directedIds=Object.keys(direction.lines);
 const missing=runtimeIds.filter(id=>!direction.lines[id]),extra=directedIds.filter(id=>!PICNIC_LINES[id]);
 if(missing.length||extra.length)throw new Error(`Direction/runtime mismatch. Missing: ${missing} Extra: ${extra}`);
 for(const id of runtimeIds){
  const {generationText}=direction.lines[id];
  if(/[^\x20-\x7E]/.test(generationText))throw new Error(`${id}: use plain ASCII in generation text (earlier UI runs mis-encoded curly apostrophes)`);
  if(spokenWords(generationText).join(' ')!==spokenWords(PICNIC_LINES[id].text).join(' '))throw new Error(`${id}: generation words differ from runtime text`);
 }
 return direction;
}

function requireApiKey(){
 try{process.loadEnvFile('.env');}catch{}
 const key=process.env.ELEVENLABS_API_KEY?.trim();
 if(!key)throw new Error('ELEVENLABS_API_KEY is missing. Add it to the gitignored .env file.');
 return key;
}

// Confirm the expected model exists for this account rather than silently falling back to another model.
async function resolveModelId(key){
 const wanted=process.env.ELEVENLABS_MODEL_ID?.trim()||'eleven_v4';
 const response=await fetch(`${API}/models`,{headers:{'xi-api-key':key}});
 if(!response.ok)throw new Error(`Model list failed: HTTP ${response.status} ${await response.text()}`);
 const models=await response.json();
 if(!models.some(model=>model.model_id===wanted)){
  const available=models.filter(model=>model.can_do_text_to_speech).map(model=>model.model_id).join(', ');
  throw new Error(`Model ${wanted} unavailable. Set ELEVENLABS_MODEL_ID to one of: ${available}`);
 }
 return wanted;
}

async function synthesiseLine(key,modelId,speaker,generationText){
 const response=await fetch(`${API}/text-to-speech/${VOICES[speaker].voiceId}?output_format=mp3_44100_128`,{
  method:'POST',headers:{'xi-api-key':key,'content-type':'application/json',accept:'audio/mpeg'},
  body:JSON.stringify({text:generationText,model_id:modelId,voice_settings:VOICE_SETTINGS}),
 });
 if(!response.ok)throw new Error(`HTTP ${response.status}: ${(await response.text()).slice(0,300)}`);
 return {audio:Buffer.from(await response.arrayBuffer()),requestId:response.headers.get('request-id'),characterCost:Number(response.headers.get('character-cost'))||null};
}

// Transcribe a take with ElevenLabs Scribe so dropped, added or garbled words are caught before listening.
async function transcribeTake(key,path){
 const form=new FormData();
 form.append('model_id','scribe_v1');form.append('language_code','en');form.append('tag_audio_events','false');
 form.append('file',new Blob([await readFile(path)],{type:'audio/mpeg'}),'take.mp3');
 const response=await fetch(`${API}/speech-to-text`,{method:'POST',headers:{'xi-api-key':key},body:form});
 if(!response.ok)throw new Error(`HTTP ${response.status}: ${(await response.text()).slice(0,300)}`);
 return (await response.json()).text;
}

// Generate missing or retake-requested lines, reuse accepted samples, then verify every take's words.
async function producePicnicVoices(){
 const direction=await loadCheckedDirection();
 const ids=Object.keys(PICNIC_LINES);
 const log=await exists(LOG_FILE)?JSON.parse(await readFile(LOG_FILE,'utf8')):{directionVersion:2,entries:{}};
 const reused=new Set(direction.reusedFromEnergyReview);
 const toGenerate=ids.filter(id=>{
  const line=direction.lines[id],previous=log.entries[id];
  if(reused.has(id)||line.reuseTakeOf)return false;
  return retakeIds.has(id)||!previous||previous.generationTextSha256!==sha256(line.generationText);
 });
 const characters=toGenerate.reduce((sum,id)=>sum+direction.lines[id].generationText.length,0);
 console.log(`${ids.length} lines: ${reused.size} reused accepted samples, ${toGenerate.length} to generate (~${characters} characters).`);
 if(dryRun)return;

 const key=requireApiKey();
 await mkdir(ORIGINALS,{recursive:true});
 const modelId=verifyOnly?log.modelId:await resolveModelId(key);
 log.modelId=modelId;log.voiceSettings=VOICE_SETTINGS;log.voices=VOICES;
 const save=()=>writeFile(LOG_FILE,JSON.stringify(log,null,2)+'\n');

 if(!verifyOnly){
  for(const id of reused){
   await copyFile(`${ENERGY_REVIEW}/${id}.mp3`,`${ORIGINALS}/${id}.mp3`);
   log.entries[id]=keepVerifiedCopy(log.entries[id],{source:'energy-review accepted sample',generationTextSha256:sha256(direction.lines[id].generationText),originalSha256:sha256(await readFile(`${ORIGINALS}/${id}.mp3`))});
  }
  for(const [index,id] of toGenerate.entries()){
   const line=direction.lines[id],speaker=PICNIC_LINES[id].speaker;
   const take=(log.entries[id]?.take??0)+1;
   const result=await synthesiseLine(key,modelId,speaker,line.generationText);
   await writeFile(`${ORIGINALS}/${id}.mp3`,result.audio);
   log.entries[id]={source:'api',take,speaker,generationText:line.generationText,generationTextSha256:sha256(line.generationText),
    requestId:result.requestId,characterCost:result.characterCost,originalSha256:sha256(result.audio),generatedAt:new Date().toISOString()};
   await save();
   console.log(`[${index+1}/${toGenerate.length}] ${id} (${speaker}, take ${take})`);
  }
  for(const id of ids.filter(id=>direction.lines[id].reuseTakeOf)){
   const source=direction.lines[id].reuseTakeOf;
   await copyFile(`${ORIGINALS}/${source}.mp3`,`${ORIGINALS}/${id}.mp3`);
   log.entries[id]=keepVerifiedCopy(log.entries[id],{source:`identical prompt; reuses ${source}`,generationTextSha256:sha256(direction.lines[id].generationText),originalSha256:sha256(await readFile(`${ORIGINALS}/${id}.mp3`))});
  }
 }

 const mismatches=[];
 for(const id of ids){
  try{
   const heard=await transcribeTake(key,`${ORIGINALS}/${id}.mp3`);
   const matches=spokenWords(heard).join(' ')===spokenWords(PICNIC_LINES[id].text).join(' ');
   Object.assign(log.entries[id],{transcript:heard,transcriptMatches:matches});
   if(!matches)mismatches.push(`${id}: heard "${heard}"`);
  }catch(error){
   // A key without speech-to-text permission should not erase transcripts from the local Whisper checker.
   if(error.message.includes('speech_to_text')){
    await save();console.log('Key lacks speech-to-text permission; run: python scripts/verify-voice-transcripts.py');return;
   }
   Object.assign(log.entries[id],{transcript:null,transcriptMatches:null});
   mismatches.push(`${id}: transcription unavailable (${error.message})`);
  }
 }
 log.verifiedAt=new Date().toISOString();
 await save();
 console.log(mismatches.length?`Transcript differences to review or retake:\n${mismatches.join('\n')}`:`All ${ids.length} transcripts match the runtime text.`);
}

producePicnicVoices().catch(error=>{console.error(error.message);process.exitCode=1;});
