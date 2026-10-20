import {PICNIC_LINES} from './picnic-content.js';

// Transcript-checked direction-v2 takes play alongside human-reviewed ones; draft/unchecked takes never reach the child.
export const PLAYABLE_CLIP_REVIEWS=['listen-reviewed','teaching-reviewed','produced-auto-checked'];
const MOUTH_FRAMES_PER_SECOND=25;

// Read the recording's precomputed loudness envelope at a playback time; 0 is closed, 1 fully open.
export function mouthOpenness(envelope,seconds){
 const digit=envelope?.[Math.floor(seconds*MOUTH_FRAMES_PER_SECOND)];
 return digit?Number(digit)/9:0;
}

// One owner for dialogue prevents queued instructions; a generation token also cancels a late-loading audio clip.
export function createPicnicAudio({environment=globalThis,onSpeaking=()=>{},onMouth=()=>{},onUnavailable=()=>{}}={}){
 let clip=null,utterance=null,generation=0,mouthFrame=null;
 // Follow the playing clip each animation frame; a stale generation token ends the loop.
 const followMouth=(speaker,envelope,token)=>{
  if(!envelope||!environment.requestAnimationFrame)return;
  const step=()=>{
   if(token!==generation||!clip)return;
   onMouth(speaker,mouthOpenness(envelope,clip.currentTime));mouthFrame=environment.requestAnimationFrame(step);
  };
  mouthFrame=environment.requestAnimationFrame(step);
 };
 const stop=()=>{
  generation++;if(clip){clip.pause();clip.removeAttribute?.('src');clip=null;}
  if(mouthFrame!==null){environment.cancelAnimationFrame?.(mouthFrame);mouthFrame=null;}
  environment.speechSynthesis?.cancel();utterance=null;onMouth(null,0);onSpeaking(null);
 };
 const play=(id,{muted=false}={})=>{
  stop();const line=PICNIC_LINES[id];if(!line||muted)return;
  const token=generation;
  const finish=()=>{if(token===generation){onMouth(null,0);onSpeaking(null);}};
  if(line.file&&environment.Audio&&PLAYABLE_CLIP_REVIEWS.includes(line.review)){
   clip=new environment.Audio(line.file);clip.onended=finish;clip.onerror=()=>{finish();onUnavailable();};
   onSpeaking(line.speaker);followMouth(line.speaker,line.mouth,token);
   clip.play().catch(()=>{if(token===generation){finish();onUnavailable();}});return;
  }
  if(!environment.speechSynthesis||!environment.SpeechSynthesisUtterance){onUnavailable();return;}
  utterance=new environment.SpeechSynthesisUtterance(line.text);
  utterance.lang='en-GB';utterance.rate=.94;utterance.pitch=1;
  const voices=environment.speechSynthesis.getVoices();
  utterance.voice=voices.find(voice=>voice.lang==='en-GB'&&voice.localService)||voices.find(voice=>voice.lang.startsWith('en'))||null;
  utterance.onstart=()=>{if(token===generation)onSpeaking(line.speaker);};
  utterance.onend=finish;utterance.onerror=event=>{if(token===generation){finish();if(!['canceled','interrupted'].includes(event.error))onUnavailable();}};
  environment.speechSynthesis.speak(utterance);
 };
 return {play,stop};
}
