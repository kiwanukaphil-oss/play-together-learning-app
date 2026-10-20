// Produce picnic sound effects and ambience through the ElevenLabs sound-generation API.
// Usage: node scripts/generate-picnic-sounds.mjs [--dry-run] [--retake name,name]
// Needs ELEVENLABS_API_KEY in the gitignored .env with the Sound Effects permission; the key is never written out.
import {mkdir,readFile,writeFile,access} from 'node:fs/promises';
import {createHash} from 'node:crypto';

const OUTPUT='output/sound-effects';
const LOG_FILE=`${OUTPUT}/generation-log.json`;
const API='https://api.elevenlabs.io/v1/sound-generation?output_format=mp3_44100_128';
const args=process.argv.slice(2),dryRun=args.includes('--dry-run');
const retakeArgument=args.includes('--retake')?args[args.indexOf('--retake')+1]??'':'';
const retakeNames=new Set(retakeArgument.split(',').filter(Boolean));
const sha256=value=>createHash('sha256').update(value).digest('hex');
const exists=path=>access(path).then(()=>true,()=>false);

// Ask for one sound; if the account rejects the loop option, retry once without it rather than failing the batch.
async function generateSound(key,model,sound){
 const body={text:sound.prompt,duration_seconds:sound.seconds,prompt_influence:.6,model_id:model,...(sound.loop?{loop:true}:{})};
 let response=await fetch(API,{method:'POST',headers:{'xi-api-key':key,'content-type':'application/json'},body:JSON.stringify(body)});
 if(!response.ok&&sound.loop&&response.status===422){
  delete body.loop;response=await fetch(API,{method:'POST',headers:{'xi-api-key':key,'content-type':'application/json'},body:JSON.stringify(body)});
 }
 if(!response.ok)throw new Error(`HTTP ${response.status}: ${(await response.text()).slice(0,300)}`);
 return {audio:Buffer.from(await response.arrayBuffer()),requestId:response.headers.get('request-id'),characterCost:Number(response.headers.get('character-cost'))||null,loopRequested:'loop'in body};
}

// Generate only new, changed or retake-requested sounds so reruns cost nothing.
async function producePicnicSounds(){
 const direction=JSON.parse(await readFile('docs/PICNIC_SOUND_DIRECTION.json','utf8'));
 const log=await exists(LOG_FILE)?JSON.parse(await readFile(LOG_FILE,'utf8')):{entries:{}};
 const pending=Object.entries(direction.sounds).filter(([name,sound])=>
  retakeNames.has(name)||log.entries[name]?.promptSha256!==sha256(JSON.stringify(sound)));
 console.log(`${Object.keys(direction.sounds).length} sounds; ${pending.length} to generate.`);
 if(dryRun||!pending.length)return;
 try{process.loadEnvFile('.env');}catch{}
 const key=process.env.ELEVENLABS_API_KEY?.trim();
 if(!key)throw new Error('ELEVENLABS_API_KEY is missing from .env');
 await mkdir(`${OUTPUT}/originals`,{recursive:true});
 for(const [index,[name,sound]] of pending.entries()){
  const result=await generateSound(key,direction.model,sound);
  await writeFile(`${OUTPUT}/originals/${name}.mp3`,result.audio);
  log.entries[name]={take:(log.entries[name]?.take??0)+1,prompt:sound.prompt,seconds:sound.seconds,promptSha256:sha256(JSON.stringify(sound)),
   loopRequested:result.loopRequested,requestId:result.requestId,characterCost:result.characterCost,originalSha256:sha256(result.audio),generatedAt:new Date().toISOString()};
  log.model=direction.model;
  await writeFile(LOG_FILE,JSON.stringify(log,null,2)+'\n');
  console.log(`[${index+1}/${pending.length}] ${name}`);
 }
}

producePicnicSounds().catch(error=>{console.error(error.message);process.exitCode=1;});
