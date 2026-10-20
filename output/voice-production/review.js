const reviewStorageKey='picnic-recording-review-v2';
let savedReviews={};
try{savedReviews=JSON.parse(localStorage.getItem(reviewStorageKey)||'{}');}catch{savedReviews={};}
if(!savedReviews||typeof savedReviews!=='object'||Array.isArray(savedReviews))savedReviews={};
const recordingsContainer=document.querySelector('#recordings');
const recordingCards=[];
const audioPlayers=[];
const makeElement=(tag,className,text)=>{
 const element=document.createElement(tag);element.className=className;
 if(text!==undefined)element.textContent=text;return element;
};

// Scope each saved judgement to the exact audio hash so replacement takes cannot inherit approval.
function readTakeReview(entry){
 const saved=savedReviews[entry.id];
 return saved?.sha256===entry.sha256&&['pending','good','retake'].includes(saved.status)&&typeof saved.note==='string'
  ?saved:{status:'pending',note:'',sha256:entry.sha256};
}

// Keep status and notes local; exporting is an explicit action, never a background upload.
function saveTakeReview(entry,status,note){
 savedReviews[entry.id]={status,note,sha256:entry.sha256};
 try{localStorage.setItem(reviewStorageKey,JSON.stringify(savedReviews));}catch{
  document.querySelector('#review-count').textContent='Storage unavailable; download notes before closing.';
  return;
 }
 filterRecordings();
}

// Build controls with DOM text nodes so transcript or review text is never interpreted as HTML.
function buildRecordingCard(entry){
 const card=makeElement('article',`recording ${entry.speaker}`);
 const identity=makeElement('div','line-id',entry.id);
 const heading=makeElement('h2','',`${entry.speaker==='pip'?'Pip · Tamsin':'Bear · Mike'} · ${entry.duration.toFixed(1)} s`);
 const transcript=makeElement('p','transcript',entry.text);
 const direction=makeElement('p','direction',entry.direction);
 const player=document.createElement('audio');
 player.controls=true;player.preload='metadata';player.src=entry.file;
 player.setAttribute('aria-label',`Play ${entry.id}`);
 player.addEventListener('play',()=>{for(const other of audioPlayers)if(other!==player)other.pause();});
 audioPlayers.push(player);
 const fields=makeElement('div','review-fields');
 const statusLabel=makeElement('label','','Listening judgement');
 const statusSelect=document.createElement('select');statusSelect.setAttribute('aria-label',`Review ${entry.id}`);
 for(const [value,label] of [['pending','Not reviewed'],['good','Sounds good'],['retake','Needs another take']]){
  const option=document.createElement('option');option.value=value;option.textContent=label;statusSelect.append(option);
 }
 const review=readTakeReview(entry);statusSelect.value=review.status;
 const noteLabel=makeElement('label','','Optional note');
 const note=document.createElement('textarea');note.value=review.note;
 note.setAttribute('aria-label',`Note for ${entry.id}`);note.placeholder='For example: slower pause before the instruction';
 statusSelect.addEventListener('change',()=>saveTakeReview(entry,statusSelect.value,note.value));
 note.addEventListener('change',()=>saveTakeReview(entry,statusSelect.value,note.value));
 statusLabel.append(statusSelect);noteLabel.append(note);fields.append(statusLabel,noteLabel);
 card.append(identity,heading,transcript,direction,player,fields);recordingsContainer.append(card);
 recordingCards.push({entry,card,player});
}

// Filter without rebuilding players or losing unfinished notes; hidden recordings stop immediately.
function filterRecordings(){
 const query=document.querySelector('#search').value.trim().toLowerCase();
 const speaker=document.querySelector('#speaker').value;
 const status=document.querySelector('#review-filter').value;
 let shown=0;
 for(const {entry,card,player} of recordingCards){
  const matches=(!speaker||entry.speaker===speaker)&&(!status||readTakeReview(entry).status===status)
   &&(!query||`${entry.id} ${entry.text} ${entry.direction}`.toLowerCase().includes(query));
  card.hidden=!matches;if(matches)shown++;else player.pause();
 }
 const reviewed=recordingCatalogue.entries.filter(entry=>readTakeReview(entry).status!=='pending').length;
 document.querySelector('#review-count').textContent=`${reviewed} of ${recordingCards.length} reviewed`;
 document.querySelector('#result-count').textContent=`Showing ${shown} recordings`;
 document.querySelector('#empty').hidden=shown!==0;
}

// Export exact take hashes and explicit pending decisions; this does not approve clips in the app.
function downloadReviewNotes(){
 const review={scriptVersion:recordingCatalogue.scriptVersion,exportedAt:new Date().toISOString(),
  scope:'Character performance and transcript listening; not professional phonics review',
  entries:recordingCatalogue.entries.map(entry=>({id:entry.id,...readTakeReview(entry)}))};
 const url=URL.createObjectURL(new Blob([JSON.stringify(review,null,2)],{type:'application/json'}));
 const link=document.createElement('a');link.href=url;link.download='picnic-voice-review.json';
 link.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
}

for(const entry of recordingCatalogue.entries)buildRecordingCard(entry);
document.querySelector('#total').textContent=`${recordingCards.length} lines · ${Math.round(recordingCatalogue.entries.reduce((sum,e)=>sum+e.duration,0)/60)} minutes of audio`;
for(const id of ['search','speaker','review-filter'])document.querySelector(`#${id}`).addEventListener('input',filterRecordings);
document.querySelector('#export').addEventListener('click',downloadReviewNotes);
filterRecordings();
