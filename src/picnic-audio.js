import {PICNIC_LINES} from './picnic-content.js';

// One owner for dialogue prevents queued instructions; a generation token also cancels a late-loading audio clip.
export function createPicnicAudio({environment=globalThis,onSpeaking=()=>{},onUnavailable=()=>{}}={}){
 let clip=null,utterance=null,generation=0;
 const stop=()=>{
  generation++;if(clip){clip.pause();clip.removeAttribute?.('src');clip=null;}
  environment.speechSynthesis?.cancel();utterance=null;onSpeaking(null);
 };
 const play=(id,{muted=false}={})=>{
  stop();const line=PICNIC_LINES[id];if(!line||muted)return;
  const token=generation;
  const finish=()=>{if(token===generation)onSpeaking(null);};
  if(line.file&&['listen-reviewed','teaching-reviewed'].includes(line.review)){
   clip=new environment.Audio(line.file);clip.onended=finish;clip.onerror=()=>{finish();onUnavailable();};
   onSpeaking(line.speaker);clip.play().catch(()=>{if(token===generation){finish();onUnavailable();}});return;
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
