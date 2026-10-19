import {WORLDS,WORDS,SOUND_GROUPS,STORIES,MISSIONS,SKILLS,BOOKS} from './content.js';
import {DRAWINGS,drawingSvg} from './drawing.js';
import {LETTER_MODELS,letterSvg} from './handwriting.js';
import {SAVE_KEY,defaultProgress,loadProgress,persistProgress,validateProgress,recordObservation,levelFor,shuffled,chooseFresh,dailyWorlds} from './learning.js';

const app=document.getElementById('app');
let progress=defaultProgress(), storageWarning='', storageHealthy=true;
try{progress=loadProgress(localStorage);}catch{storageHealthy=false;storageWarning='Your saved progress could not be read. It has been kept untouched. Export the saved data in Parent corner before replacing it.';}
let screen='home',world=null,activity=null,round=0,correct=false,helped=false,roundHelp=false,sessionEvidence=[],selectedLetters=[],selectedFrames=[],basket=0;
let drawingIndex=0,drawingStep=0,showFinished=false,daily=false,dailyIndex=0,parentUnlocked=false,toastTimer,sessionBaseline=null,adventureWorlds=[];
let letter='a',letterStroke=0,animateLetter=false,bookIndex=0,bookPage=0;
const escapeHtml=value=>String(value).replace(/[&<>"']/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
const icon=(symbol)=>`<span aria-hidden="true">${symbol}</span>`;
const button=(label,action,extra='')=>`<button type="button" data-action="${action}" ${extra}>${label}</button>`;
const currentWorld=()=>WORLDS.find(item=>item.id===world);
const activitySkill=(mode=activity?.mode)=>world==='words'&&mode==='read'?'reading':world==='numbers'&&['add','subtract','share'].includes(mode)?'operations':currentWorld()?.skill||'drawing';
const companion=()=>progress.avatar==='bunny'?'🐰':progress.avatar==='bear'?'🐻':'🐈';

function announce(message){document.getElementById('announcement').textContent=message;}
function stopSpeech(){if('speechSynthesis'in window)window.speechSynthesis.cancel();}

// Speak whole-word instructions only: browser speech is not used as an authoritative phoneme recording.
function speak(message){
 stopSpeech();if(progress.muted)return;
 if(!('speechSynthesis'in window)){notify('Sound is unavailable. A grown-up can read the short prompt.');return;}
 const utterance=new SpeechSynthesisUtterance(message);utterance.lang='en-GB';utterance.rate=.84;utterance.pitch=1.08;
 const voices=speechSynthesis.getVoices();utterance.voice=voices.find(voice=>voice.lang==='en-GB'&&voice.localService)||voices.find(voice=>voice.lang.startsWith('en'))||null;
 utterance.onerror=event=>{if(!['interrupted','canceled'].includes(event.error))notify('Sound could not play. Try the speaker again or ask a grown-up.');};
 speechSynthesis.speak(utterance);
}

function save(){
 if(!storageHealthy){notify('Progress is temporary. A grown-up can recover the saved data in Parent corner.');return;}
 try{progress=persistProgress(localStorage,progress);}catch{storageWarning='Progress could not be saved. Export a backup before closing this page.';notify(storageWarning);}
}

function notify(message){
 let toast=document.getElementById('toast');if(!toast){toast=document.createElement('div');toast.id='toast';toast.setAttribute('role','status');document.body.append(toast);}
 toast.textContent=message;clearTimeout(toastTimer);toastTimer=setTimeout(()=>toast.remove(),6000);
}

function header(){
 return `<header class="app-header"><button class="brand" data-action="home" aria-label="Play Together home"><img src="./assets/icon.svg" alt="" width="44" height="44"><span>play<span class="brand-accent">together</span><small>A LITTLE WORLD OF WONDER</small></span></button><div class="header-tools">${screen!=='home'?button('⌂','home','class="circle-button" aria-label="Home"'):''}${button(progress.muted?'🔇':'🔊','mute',`class="circle-button" aria-label="${progress.muted?'Turn sound on':'Mute sound'}" aria-pressed="${progress.muted}"`)}${button('⚙','parent','class="circle-button parent-button" aria-label="Parent corner"')}</div></header>`;
}

// Each destination has a small, code-native illustration; decorative detail never becomes a competing control.
function scene(worldId){
 const scenes={
  sounds:`<path d="M15 160 Q80 85 150 150 Q220 95 285 160" fill="#a9d971"/><path d="M40 145 45 60 M45 75 Q10 40 15 80 M45 75 Q80 30 80 75" stroke="#487a50" stroke-width="12" fill="none"/><circle cx="171" cy="108" r="48" fill="#e58d3c"/><circle cx="171" cy="113" r="32" fill="#ffcd76"/><circle cx="160" cy="108" r="4"/><circle cx="183" cy="108" r="4"/><path d="m166 120 6 5 6-5M171 126q-10 12-16 0m16 0q10 12 16 0" fill="none" stroke="#543541" stroke-width="3"/><path d="M248 78q-18 16 0 31m12-42q-30 26 0 51" fill="none" stroke="#fff" stroke-width="5"/>`,
  words:`<path d="M20 165H280" stroke="#8f6abc" stroke-width="8"/><rect x="40" y="90" width="75" height="58" rx="13" fill="#fff"/><rect x="122" y="90" width="75" height="58" rx="13" fill="#ffd26e"/><path d="M205 85h35V60h30v88h-65z" fill="#a4dbe4"/><circle cx="60" cy="151" r="15" fill="#513c82"/><circle cx="99" cy="151" r="15" fill="#513c82"/><circle cx="142" cy="151" r="15" fill="#513c82"/><circle cx="181" cy="151" r="15" fill="#513c82"/><circle cx="225" cy="151" r="15" fill="#513c82"/><circle cx="260" cy="151" r="15" fill="#513c82"/><text x="77" y="131" text-anchor="middle" fill="#7550b4" font-size="38" font-weight="800">a</text><text x="159" y="131" text-anchor="middle" fill="#7550b4" font-size="38" font-weight="800">b</text><circle cx="247" cy="39" r="10" fill="#ffffff99"/><circle cx="222" cy="21" r="14" fill="#ffffff66"/>`,
  numbers:`<rect x="60" y="126" width="180" height="43" rx="12" fill="#f396ac"/><path d="M81 82h138v25q0 48-69 48t-69-48z" fill="#fff"/><path d="M81 83q69-18 138 0" fill="none" stroke="#e9b7c6" stroke-width="7"/><path d="M123 75q-32-48-4-49t18 47M178 76q36-47 10-52t-23 48" fill="#ffb65d" stroke="#b15f53" stroke-width="3"/><circle cx="150" cy="49" r="24" fill="#f46e8b"/><path d="m143 27 9 12 13-14" fill="none" stroke="#4ba77e" stroke-width="8"/><text x="153" y="118" text-anchor="middle" fill="#ad6596" font-size="24">1 2 3</text>`,
  shapes:`<path d="M135 139 115 177 145 164 156 187 172 146" fill="#ffc269"/><path d="M120 136V87q0-38 35-62 35 24 35 62v49z" fill="#fff"/><circle cx="155" cy="91" r="21" fill="#77c4ee"/><path d="m120 112-30 39 30-9m70-30 30 39-30-9" fill="#fd97b1"/><path d="m55 49 6 12 14 2-10 10 2 14-12-7-12 7 3-14-11-10 15-2" fill="#ffe28a"/><circle cx="243" cy="106" r="22" fill="#b5a0ee"/><ellipse cx="243" cy="106" rx="36" ry="8" fill="none" stroke="#e2dcff" stroke-width="5"/>`,
  stories:`<path d="M50 50h200v117H50z" fill="#fff1cf"/><path d="M44 45h65q-2 64-62 80zm212 0h-65q2 64 62 80z" fill="#e878a2"/><path d="M39 43h222" stroke="#574995" stroke-width="12"/><path d="M39 170h222" stroke="#574995" stroke-width="16"/><circle cx="151" cy="107" r="26" fill="#ffc665"/><path d="m131 89-5-22 22 15m8 0 22-15-5 22" fill="#ffc665"/><circle cx="142" cy="106" r="3"/><circle cx="161" cy="106" r="3"/><path d="M137 122q14 10 28 0" fill="none" stroke="#664f55" stroke-width="3"/>`,
  art:`<path d="M145 175V35" stroke="#b67f52" stroke-width="22"/><circle cx="95" cy="65" r="46" fill="#8dc790"/><circle cx="155" cy="42" r="47" fill="#a1d59a"/><circle cx="207" cy="71" r="45" fill="#8dc790"/><path d="M90 86 150 44 213 86v75H90z" fill="#fff0c1"/><path d="m80 89 70-49 75 49" fill="none" stroke="#a583d4" stroke-width="13"/><rect x="134" y="112" width="35" height="49" rx="15" fill="#bb9ae4"/><rect x="102" y="100" width="20" height="23" rx="4" fill="#77c4ee"/><path d="M200 158 225 190m-17-20h26" fill="none" stroke="#b67f52" stroke-width="7"/>`,
 };
 return `<svg class="world-scene" viewBox="0 0 300 200" aria-hidden="true"><g fill="#543541">${scenes[worldId]}</g></svg>`;
}

function renderHome(){
 return `<main id="main" class="home-page"><section class="welcome"><div><div class="hello-tag">${icon('✨')} COME ON IN!</div><h1>Little steps.<br><span>Big adventures.</span></h1><p>Where shall we play today?</p><button class="primary adventure-button" data-action="daily">${icon('▶')} Let's play <span class="button-sparkle">✦</span></button></div><div class="welcome-art" aria-hidden="true"><span class="cloud cloud-one"></span><span class="cloud cloud-two"></span><span class="sky-star star-one">✧</span><span class="sky-star star-two">✦</span><div class="mascot-orbit"><img class="mascot" src="./assets/icon.svg" alt=""><span class="speech-bubble">Hi, explorer! 👋</span></div><span class="rainbow">🌈</span><div class="hill hill-one"></div><div class="hill hill-two"></div></div></section><div class="world-heading"><h2>Your playground</h2><button class="text-button" data-action="mission">${icon('🦶')} Play away from the screen</button></div><section class="world-grid" aria-label="Choose a place to play">${WORLDS.map(item=>`<button class="world-card ${item.colour}" data-action="world" data-world="${item.id}" aria-label="${item.name}"><div class="scene-wrap">${scene(item.id)}<span class="world-arrow">↗</span></div><div class="world-card-footer"><span>${item.name}</span><span class="world-small-icon">${item.icon}</span></div></button>`).join('')}</section><footer class="home-footer"><span>Made for curious little minds. Best enjoyed together.</span>${button('⭐ My treasures','treasures','class="text-button"')}</footer></main>`;
}

const modes={sounds:[['first','🔎','Sound hunt'],['blend','🤖','Robot words']],words:[['build','🚂','Build a word'],['read','📖','Read & find'],['switch','🪄','Word switch']],numbers:[['count','🧺','Pack a picnic'],['compare','⚖️','More or fewer'],['add','🍓','Put together'],['subtract','🐰','Take away'],['share','🍽️','Fair shares']],shapes:[['shape','🔺','Find a shape'],['pattern','🟣','What comes next?'],['position','🧸','Where is it?'],['measure','📏','Long & short']],stories:[['sequence','🎬','Picture stories'],['readstory','📚','Read together']]};
function renderWorld(){
 const place=currentWorld();
 return `<main id="main" class="activity-page"><div class="world-title"><span class="world-emoji">${place.icon}</span><h1>${place.name}</h1><p>${place.description}</p></div><div class="mode-grid">${modes[world].map(([id,symbol,name])=>`<button class="mode-card ${place.colour}" data-action="start" data-mode="${id}">${icon(symbol)}<strong>${name}</strong><span class="mode-play">▶</span></button>`).join('')}${world==='stories'?'<button class="mode-card yellow" data-action="books"><span>📚</span><strong>Little books</strong><span class="mode-play">▶</span></button>':''}</div><button class="secondary back-button" data-action="home">⌂ Home</button></main>`;
}

// Build bounded questions from explicit content pools; spelling never exceeds the parent-selected taught stage.
function createQuestion(mode){
 const level=levelFor(progress,activitySkill(mode));
 const recent=[...progress.recent,...sessionEvidence.map(item=>item.content)];
 const pick=items=>shuffled(items)[0];
 if(world==='sounds'){
  if(mode==='blend'){
   const pool=WORDS.filter(item=>['pin','pan','map'].includes(item.word));
   const target=chooseFresh(pool,recent);const choices=shuffled([target,...pool.filter(item=>item.id!==target.id)]);
   return {id:target.id,mode,answer:target.word,target,choices,prompt:'Listen with your grown-up.',speech:'Ask your grown-up to say the sounds slowly. Choose the word you hear.'};
  }
  const group=pick(SOUND_GROUPS),target=pick(group.items),others=shuffled(SOUND_GROUPS.filter(item=>item.sound!==group.sound)).slice(0,2).map(item=>pick(item.items));
  return {id:`sound-${target[0]}`,mode,answer:target[0],group,choices:shuffled([target,...others]),prompt:`Starts like ${group.items[0][0]}`,speech:`Which picture starts with the same sound as ${group.items[0][0]}?`};
 }
 if(world==='words'){
  if(mode==='switch'){
   const pairs=[['sat','mat'],['pan','pat'],['pin','pan'],['cat','cap'],['dog','dig'],['hen','pen'],['hat','cat']].filter(pair=>pair.every(word=>WORDS.find(item=>item.word===word).stage<=Math.min(progress.taughtStage,level)));
   const pair=pick(pairs),index=[...pair[0]].findIndex((letter,index)=>letter!==pair[1][index]);
   return {id:`switch-${pair.join('-')}`,mode,base:pair[0],target:pair[1],index,answer:pair[1][index],choices:shuffled([...new Set([pair[1][index],pair[0][index],'s','n'])]),prompt:'Change one letter',speech:`This word is ${pair[0]}. Change one letter to make ${pair[1]}.`};
  }
  const pictureWords=['pin','pan','map','cat','cap','can','dog','pot','pig','sun','cup','mug','bug','bus','hen','pen','net','bed','hat','fan','fox','box','van','web','jet','jug','ship','fish','dish','chip','ring','king','wing','duck','sock','rock','rain','seed','feet','moon','boat','coat','goat','star','car'];
  const pool=WORDS.filter(item=>item.stage<=Math.min(progress.taughtStage,level)&&(mode!=='read'||pictureWords.includes(item.word)));const target=chooseFresh(pool,recent);
  return {id:target.id,mode,target,answer:target.word,choices:shuffled([target,...shuffled(pool.filter(item=>item.id!==target.id)).slice(0,2)]),letters:shuffled([...target.graphemes,...shuffled(['s','a','t','p','i','n','m'].filter(letter=>!target.graphemes.includes(letter))).slice(0,2)]),prompt:mode==='read'?'Read it. Find it.':'Listen. Build it.',speech:mode==='read'?'Read the word. Choose its picture.':`Build the word ${target.word}. ${target.word}.`};
 }
 if(world==='numbers'){
  if(mode==='share'){
   const total=2*(1+Math.floor(Math.random()*(level?5:3)));
   return {id:`share-${total}`,mode,a:total,b:2,answer:total/2,choices:shuffled([total/2,0,total/2+1,total/2+2]),prompt:'The same for each friend',speech:`Share ${total} strawberries between two friends. How many should each friend get?`};
  }
  const max=level===0?5:level===1?10:12,a=1+Math.floor(Math.random()*(mode==='count'?max:Math.min(max,5))),b=1+Math.floor(Math.random()*4);
  const target=mode==='add'?a+b:mode==='subtract'?Math.max(0,a-b):a;
  return {id:`${mode}-${a}-${b}`,mode,a,b:mode==='subtract'?Math.min(a,b):b,answer:target,choices:shuffled([...new Set([target,Math.max(0,target-1),target+1,target+2])]),prompt:mode==='count'?`Pack ${a} apples`:mode==='add'?'How many altogether?':mode==='subtract'?'How many are left?':'Which has more?',speech:mode==='count'?`Put ${a} apples in the basket.`:mode==='add'?`Here are ${a} strawberries and ${b} more. How many altogether?`:mode==='subtract'?`${a} carrots. The bunny takes ${Math.min(a,b)}. How many are left?`:'Which group has more?'};
 }
 if(world==='shapes'){
  if(mode==='position'){const answer=pick(['above','below','beside']);return {id:`position-${answer}`,mode,answer,choices:shuffled(['above','below','beside']),prompt:`Find the ball ${answer}`,speech:`Find the ball ${answer} the box.`};}
  if(mode==='measure'){const longest=Math.random()>.5;return {id:`measure-${longest?'long':'short'}`,mode,answer:longest?180:60,choices:shuffled([60,110,180]),prompt:longest?'Which is longest?':'Which is shortest?',speech:longest?'Which ribbon is longest?':'Which ribbon is shortest?'};}
  if(mode==='shape'){const names=['circle','triangle','square','star'],answer=pick(names);return {id:`shape-${answer}`,mode,answer,choices:shuffled(names),prompt:`Find the ${answer}`,speech:`Find the ${answer}.`};}
  const symbols=shuffled(['🟣','🔶','⭐','🔵']),length=level>1?3:2,pattern=Array.from({length:5},(_,index)=>symbols[index%length]);
  return {id:`pattern-${symbols.slice(0,length).join('')}`,mode,answer:symbols[5%length],pattern,choices:shuffled(symbols),prompt:'What comes next?',speech:'Look at the pattern. What comes next?'};
 }
 const story=chooseFresh(STORIES,recent);
 return {id:story.id,mode,story,choices:shuffled(story.frames.map((frame,index)=>({frame,index}))),answer:story.frames,prompt:mode==='readstory'?'Tell me a story':'First. Next. Last.',speech:mode==='readstory'?'Look at the pictures. Tell your grown-up a story.':'Put the pictures in order. What happens first?'};
}

function startActivity(mode){
 round=0;helped=false;sessionEvidence=[];sessionBaseline=null;screen='game';newQuestion(mode);render();speak(activity.speech);
}

function newQuestion(mode){activity=createQuestion(mode);correct=false;roundHelp=false;selectedLetters=[];selectedFrames=[];basket=0;}
const shapeSymbol=name=>({circle:'●',triangle:'▲',square:'■',star:'★'}[name]);

// Render one focused activity surface; answer controls carry values without placing the solution in the visible instruction.
function gameContent(){
 const q=activity;
 if(world==='words'&&q.mode==='switch')return `<div class="switch-word">${q.base} <span>→</span> ${[...q.target].map((letter,index)=>index===q.index?'_':letter).join('')}</div><div class="letter-bank">${q.choices.map(letter=>button(letter,'answer',`data-answer="${letter}" ${correct?'disabled':''}`)).join('')}</div>`;
 if(world==='words'&&q.mode==='build')return `<button class="listen-word" data-action="replay" aria-label="Hear the word">🔊</button><div class="letter-slots" aria-label="Your word">${q.target.graphemes.map((_,index)=>`<span>${escapeHtml(selectedLetters[index]||'')}</span>`).join('')}</div><div class="letter-bank">${q.letters.map((letter,index)=>button(escapeHtml(letter),'letter',`data-letter="${letter}" data-index="${index}" ${correct?'disabled':''}`)).join('')}</div><div class="game-actions">${button('↶','undo','class="secondary" aria-label="Undo letter"')}${button('✓','check','class="primary" aria-label="Check word"')}</div>`;
 if(world==='words'||world==='sounds'){
  const reading=world==='words'&&q.mode==='read';
  const choiceData=q.choices.map(item=>Array.isArray(item)?{word:item[0],picture:item[1]}:item);
  return `${reading?`<div class="reading-word">${q.target.word}</div>`:q.mode==='blend'?`<div class="robot-face">🤖</div><details class="grownup-tip"><summary>Grown-up sounds</summary><p>Say ${q.target.graphemes.map(item=>`/${item}/`).join(' ')} slowly, then blend. These are prompts for a grown-up, not recorded phonemes.</p></details>`:`<div class="sound-anchor">${q.group.items[0][1]} <span>?</span></div>`}<div class="picture-choices">${choiceData.map(item=>button(`<span class="choice-picture">${item.picture}</span>`,'answer',`data-answer="${item.word}" aria-label="${item.word}" ${correct?'disabled':''}`)).join('')}</div>`;
 }
 if(world==='numbers'){
  if(q.mode==='share')return `<div class="sharing-fruit">${'🍓'.repeat(q.a)}</div><div class="sharing-friends">🐈 🍽️ <span>?</span> 🍽️ 🐻</div><div class="number-choices">${q.choices.map(value=>button(String(value),'answer',`data-answer="${value}" ${correct?'disabled':''}`)).join('')}</div>`;
  if(q.mode==='count')return `<div class="target-number">${q.answer}</div><div class="basket-scene"><span class="basket-character">${companion()}</span><div class="basket-items" aria-label="${basket} apples in basket">${basket?'🍎'.repeat(basket):'🧺'}</div></div><div class="game-actions">${button('− 🍎','remove','class="secondary" aria-label="Remove an apple"')}${button('+ 🍎','add','class="primary" aria-label="Add an apple"')}${button('✓','check','class="secondary" aria-label="Check basket"')}</div>`;
  if(q.mode==='compare'){const right=q.a===q.b?q.b+1:q.b;return `<div class="compare-groups">${[q.a,right].map(amount=>button('🍓'.repeat(amount),'answer',`data-answer="${amount===Math.max(q.a,right)?q.answer:-1}" aria-label="${amount} strawberries" ${correct?'disabled':''}`)).join('')}</div>`;}
  return `<div class="counting-story"><span>${'🥕'.repeat(q.a)}</span><span class="math-symbol">${q.mode==='add'?'+':'−'}</span><span>${'🥕'.repeat(q.b)}</span></div><div class="number-choices">${q.choices.map(value=>button(String(value),'answer',`data-answer="${value}" ${correct?'disabled':''}`)).join('')}</div>`;
 }
 if(world==='shapes'){
  if(q.mode==='position')return `<div class="position-choices">${q.choices.map(position=>button(`<svg viewBox="0 0 200 200" aria-hidden="true"><rect x="75" y="75" width="70" height="55" rx="6" fill="#e4b77f"/><path d="M75 90H145 M110 75V130" stroke="#bd9563" stroke-width="3"/><circle cx="${position==='beside'?35:110}" cy="${position==='above'?35:position==='below'?165:100}" r="23" fill="#9371cf"/><path d="M${position==='beside'?20:95} ${position==='above'?20:position==='below'?150:85}q25 5 27 28" fill="none" stroke="#d7c3f4" stroke-width="5"/></svg>`,'answer',`data-answer="${position}" aria-label="Ball ${position} the box" ${correct?'disabled':''}`)).join('')}</div>`;
  if(q.mode==='measure')return `<div class="measure-choices">${q.choices.map((length,index)=>button(`<svg viewBox="0 0 220 70" aria-hidden="true"><rect x="20" y="20" width="${length}" height="30" rx="5" fill="#b999e1"/><path d="M20 15V55" stroke="#7c619c" stroke-width="2" stroke-dasharray="3 3"/></svg>`,'answer',`data-answer="${length}" aria-label="Ribbon ${index+1}" ${correct?'disabled':''}`)).join('')}</div>`;
  return `${q.mode==='pattern'?`<div class="pattern-row">${q.pattern.map(item=>`<span>${item}</span>`).join('')}<span class="pattern-question">?</span></div>`:'<div class="builder-friend">🤖</div>'}<div class="shape-choices">${q.choices.map((value,index)=>button(q.mode==='shape'?shapeSymbol(value):value,'answer',`class="shape-choice shape-${index}" data-answer="${value}" aria-label="${q.mode==='shape'?value:'Choose '+value}" ${correct?'disabled':''}`)).join('')}</div>`;
 }
 if(q.mode==='readstory')return `<div class="story-panels">${q.story.frames.map(([picture,text])=>`<button data-action="say" data-speech="${text}" class="story-frame"><span>${picture}</span><small>${text}</small></button>`).join('')}</div><button class="primary" data-action="story-done">I told my story! ✨</button>`;
 return `<div class="story-slots">${[0,1,2].map(index=>`<span>${selectedFrames[index]!==undefined?q.story.frames[selectedFrames[index]][0]:index+1}</span>`).join('')}</div><div class="picture-choices">${q.choices.map(({frame,index})=>button(`<span class="choice-picture">${frame[0]}</span>`,'frame',`data-frame="${index}" aria-label="${frame[1]}" ${selectedFrames.includes(index)||correct?'disabled':''}`)).join('')}</div><div class="game-actions">${button('↶','undo','class="secondary" aria-label="Undo picture"')}${button('✓','check','class="primary" aria-label="Check story"')}</div>`;
}

function renderGame(){
 return `<main id="main" class="game-page ${currentWorld().colour}"><div class="game-top"><span class="game-world">${currentWorld().icon} ${currentWorld().name}</span><div class="round-dots" aria-label="Activity ${round+1} of 4">${[0,1,2,3].map(index=>`<span class="${index<=round?'filled':''}"></span>`).join('')}</div></div><div class="game-card"><div class="game-prompt"><h1>${activity.prompt}</h1><button class="circle-button" data-action="replay" aria-label="Hear instructions again">🔊</button></div>${gameContent()}<div id="game-feedback" class="game-feedback ${correct?'success':''}" role="status">${correct?`<span>✨ ${world==='stories'?'You told a story!':'You did it!'}</span>${button('Next →','next','class="primary"')}`:''}</div></div><div class="game-bottom">${button('🖐 Show me','help','class="secondary"')}${button('🌿 Take a break','break','class="text-button"')}</div></main>`;
}

function renderArt(){
 if(screen==='art-menu')return `<main id="main" class="activity-page"><div class="world-title"><span class="world-emoji">🎨</span><h1>Art Treehouse</h1><p>Paper. Pencils. Your imagination!</p></div><div class="art-toolbar">${button('✏️ Pencil play','pencil','class="secondary"')}${button('a b c Letters','letters','class="secondary"')}${button('🌟 Surprise me','surprise-art','class="primary"')}</div><div class="drawing-library">${DRAWINGS.map((lesson,index)=>`<button class="drawing-tile" data-action="drawing" data-drawing="${index}">${drawingSvg(lesson,lesson.steps.length-1)}<span>${lesson.name}</span>${progress.art.includes(lesson.id)?'<span class="drawn-badge" aria-label="Drawn before">★</span>':''}</button>`).join('')}</div></main>`;
 const lesson=DRAWINGS[drawingIndex],step=showFinished?lesson.steps.length-1:drawingStep;
 return `<main id="main" class="drawing-page"><div class="drawing-heading"><div><span class="eyebrow">DRAW ON PAPER</span><h1>${lesson.name}</h1></div>${button('🎨 More pictures','art-menu','class="secondary"')}</div><div class="drawing-layout"><div class="paper-board">${drawingSvg(lesson,step)}<div class="paper-shadow"></div></div><div class="drawing-guidance"><div class="step-pill">${showFinished?'The whole picture':`${drawingStep+1} / ${lesson.steps.length}`}</div><h2>${showFinished?'Make it yours!':lesson.steps[drawingStep][0]}</h2>${button('🔊','drawing-speak','class="circle-button" aria-label="Hear drawing instruction"')}<div class="drawing-controls">${button('←','drawing-prev',`class="secondary" aria-label="Previous step" ${drawingStep===0||showFinished?'disabled':''}`)}${drawingStep===lesson.steps.length-1&&!showFinished?button('I drew it! ✨','drawing-done','class="primary"'):button('Next →','drawing-next',`class="primary" ${showFinished?'disabled':''}`)}</div>${button(showFinished?'Back to my step':'See the whole picture','drawing-finished','class="text-button"')}<div class="paper-task"><span>✏️</span><div><strong>Add your own colours.</strong><p>Give your picture a name!</p></div></div></div></div></main>`;
}

function renderPencil(){
 return `<main id="main" class="activity-page"><div class="world-title"><span class="world-emoji">✏️</span><h1>Pencil playground</h1><p>Copy a path on your paper.</p></div><div class="pencil-grid">${['M20 80 H340','M20 30 Q60 130 100 30 T180 30 T260 30 T340 30','M20 90 60 20 100 90 140 20 180 90 220 20 260 90 300 20 340 90','M20 80 Q60 0 100 80 T180 80 T260 80 T340 80','M35 75a30 30 0 1 1 1 0 M125 75a30 30 0 1 1 1 0 M215 75a30 30 0 1 1 1 0 M305 75a30 30 0 1 1 1 0','M30 90V25H80V90H130V25H180V90H230V25H280V90H330'].map((path,index)=>`<button class="pencil-card" data-action="say" data-speech="Copy this ${['straight','loopy','zigzag','wavy','circle','stepping'][index]} path on your paper."><svg viewBox="0 0 360 120" role="img" aria-label="${['Straight','Loop','Zigzag','Wave','Circle','Step'][index]} pattern"><path d="${path}" fill="none" stroke="currentColor" stroke-width="5" stroke-linecap="round"/></svg></button>`).join('')}</div>${button('🎨 Back to pictures','art-menu','class="primary"')}</main>`;
}

function renderLetters(){
 return `<main id="main" class="drawing-page"><div class="drawing-heading"><div><span class="eyebrow">PAPER & PENCIL</span><h1>Little letter studio</h1></div>${button('🎨 Pictures','art-menu','class="secondary"')}</div><div class="letter-picker">${Object.keys(LETTER_MODELS).map(value=>button(value,'choose-letter',`data-letter="${value}" aria-label="Letter ${value}" aria-pressed="${value===letter}"`)).join('')}</div><div class="drawing-layout"><div class="paper-board">${letterSvg(letter,letterStroke,animateLetter)}</div><div class="drawing-guidance"><span class="step-pill">${letterStroke+1} / ${LETTER_MODELS[letter].length}</span><h2>Start at the dot.</h2><p>Watch. Then try on paper.</p>${button('▶ Show me','animate-letter','class="primary"')}<div class="drawing-controls">${button('←','letter-prev',`class="secondary" aria-label="Previous stroke" ${letterStroke===0?'disabled':''}`)}${button('Next stroke →','letter-next',`class="secondary" ${letterStroke===LETTER_MODELS[letter].length-1?'disabled':''}`)}</div>${button('I tried it! ✏️','letter-done','class="text-button"')}<details class="grownup-tip"><summary>Grown-up note</summary><p>These are generic single-storey manuscript models. Compare with school handwriting before practising. Trace slowly with a finger first; copying and independent writing are different skills.</p></details></div></div></main>`;
}

function renderBooks(){
 if(screen==='books')return `<main id="main" class="activity-page"><div class="world-title"><span class="world-emoji">📚</span><h1>Little books</h1><p>Read a little. Imagine a lot.</p></div><div class="mode-grid">${BOOKS.map((book,index)=>({book,index})).filter(({book})=>book.stage<=progress.taughtStage).map(({book,index})=>`<button class="mode-card yellow" data-action="book" data-book="${index}"><span>${book.pages[0][0]}</span><strong>${book.name}</strong><span class="mode-play">▶</span></button>`).join('')}</div><p class="library-note">More books appear when your grown-up adds taught sounds.</p></main>`;
 const book=BOOKS[bookIndex],page=book.pages[bookPage];
 return `<main id="main" class="book-page"><div class="drawing-heading"><h1>${book.name}</h1>${button('📚 Books','books','class="secondary"')}</div><div class="open-book"><div class="book-picture">${page[0]}</div><div class="book-sentence"><p>${page[1]}</p>${button('🔊','book-speak','class="circle-button" aria-label="Read this page aloud"')}</div></div><div class="game-actions">${button('←','book-prev',`class="secondary" aria-label="Previous page" ${bookPage===0?'disabled':''}`)}<span class="step-pill">${bookPage+1} / ${book.pages.length}</span>${button(bookPage===book.pages.length-1?'Finished! ✨':'Next →',bookPage===book.pages.length-1?'book-done':'book-next','class="primary"')}</div>${book.specialWords||book.specialPatterns?`<details class="grownup-tip"><summary>Read these together first</summary><p>${book.specialWords?'Additional words: '+book.specialWords.join(', ')+'. ':''}${book.specialPatterns?'Additional pattern: '+book.specialPatterns.join(', ')+'.':''} Model these before reading. The book is not fully decodable without them.</p></details>`:''}</main>`;
}

function renderComplete(){
 return `<main id="main" class="celebration"><div class="celebration-star">🌟</div><span class="eyebrow">A LITTLE MORE CONFIDENT</span><h1>Look what you did!</h1><p>High five, explorer.</p><div class="celebration-companion">${companion()} 🙌</div>${button(daily&&dailyIndex<3?'Our next adventure →':'Back to the playground','continue','class="primary"')}<details class="parent-observation"><summary>Grown-up: how did it go?</summary><p>Completion is saved as supported until you observe otherwise. Oral answers and paper work need your judgement.</p><div class="observation-actions">${button('Independently','observe','data-result="independent"')}${button('With help','observe','data-result="supported"')}${button('Practise again','observe','data-result="revisit"')}</div></details></main>`;
}

// Parent-only settings are escaped and bounded; save data is never interpolated as executable markup.
function renderParent(){
 if(!parentUnlocked)return `<main id="main" class="parent-gate"><span>👋</span><h1>For grown-ups</h1><p>Manage learning, sound, and saved progress.</p><label for="parent-answer">What is 12 + 7?</label><input id="parent-answer" inputmode="numeric" type="number" autocomplete="off"><button class="primary" data-action="unlock">Open parent corner</button><p class="small-note">A child-friendly separation, not a security lock.</p></main>`;
 return `<main id="main" class="parent-page"><div class="parent-heading"><div><span class="eyebrow">PARENT CORNER</span><h1>Small steps worth noticing.</h1></div><span class="local-badge">◉ Saved on this device</span></div>${storageWarning?`<div class="warning">${escapeHtml(storageWarning)}</div>`:''}<div class="parent-grid"><section class="parent-panel"><h2>Your companion</h2><label>Name<input id="companion-name" maxlength="24" value="${escapeHtml(progress.name)}"></label><label>Friend<select id="companion-avatar">${[['cat','Pip the cat'],['bunny','A bunny'],['bear','A bear']].map(([value,label])=>`<option value="${value}" ${value===progress.avatar?'selected':''}>${label}</option>`).join('')}</select></label><label class="check-label"><input id="motion-setting" type="checkbox" ${progress.motion?'checked':''}> Playful motion</label>${button('Save settings','save-settings','class="primary"')}</section><section class="parent-panel"><h2>Teaching sounds</h2><p>Choose the highest spelling group already taught. Progress never introduces words above this limit.</p><label>Taught sounds<select id="taught-stage">${SKILLS.spelling.steps.map((label,index)=>`<option value="${index}" ${index===progress.taughtStage?'selected':''}>${escapeHtml(label)}</option>`).join('')}</select></label><p class="small-note">English starter sequence. Align with school before changing this. Browser voice reads words and instructions; phoneme games ask a grown-up to model sounds. Specialist phonics and handwriting review is still pending.</p></section><section class="parent-panel backup-panel"><h2>Keep a backup</h2><p>Progress stays in this browser. Clearing browser data can remove it. Export regularly, or move your backup to another device.</p><div class="backup-actions">${button('↓ Export backup','export','class="secondary"')}<label class="file-button">↑ Import backup<input type="file" id="import-backup" accept="application/json,.json"></label></div>${!storageHealthy?button('Export unreadable save','export-raw','class="secondary"'):''}<p class="small-note">Import is validated first. You choose whether to replace existing progress.</p></section><section class="parent-panel"><h2>A gentle routine</h2><p>Start with a familiar activity, try one small challenge, then draw or play with real objects. Stop when he needs a break.</p><p>No streaks. No penalties. No race.</p><p class="small-note">Sound availability depends on installed browser voices and may require internet. No microphone, camera, tracking, or account is used.</p></section></div><section class="parent-panel gallery-panel"><h2>Drawing photos · optional</h2><p>Add up to six photos of paper drawings. Images stay on this device, are resized locally, and are included in exported backups. No upload occurs.</p><label class="file-button">Add a drawing photo<input type="file" id="drawing-photo" accept="image/jpeg,image/png"></label><div class="photo-grid">${progress.pictures.map(photo=>`<figure><img src="${photo.image}" alt="Saved paper drawing"><button class="text-button" data-action="remove-photo" data-photo="${photo.id}">Remove photo</button></figure>`).join('')}</div></section><h2 class="section-title">Learning map</h2><div class="skill-grid">${Object.entries(SKILLS).map(([key,skill])=>{const state=progress.skills[key]||{level:0,evidence:[]};return `<section class="skill-card"><h3>${skill.name}</h3><p>${skill.steps[Math.min(state.level,skill.steps.length-1)]}</p><label>Practice level<select data-skill-level="${key}">${skill.steps.map((label,index)=>`<option value="${index}" ${state.level===index?'selected':''}>${index+1}. ${label}</option>`).join('')}</select></label><small>${state.evidence.filter(item=>item.content!=='level-change').length} observations · ${state.override?'parent-set level':'gentle progression'}</small>${state.override?button('Resume automatic progression','auto-level',`data-skill="${key}" class="text-button"`):''}</section>`;}).join('')}</div><div class="parent-panel disclosure"><h2>What is ready, and what is still growing?</h2><p>This release includes six destinations, word and sound games, counting and operations, shape and pattern games, oral picture stories, fifteen paper-drawing lessons, and pencil patterns.</p><p>It does not yet include reviewed phoneme recordings, a school-aligned letter-formation curriculum, a complete school-aligned decodable story library. Picture-story narration is for listening together, not independent decoding. Game completion alone does not prove mastery.</p></div></main>`;
}

function renderMission(){
 const mission=MISSIONS[drawingIndex%MISSIONS.length];
 return `<main id="main" class="mission-page"><div class="mission-emoji">${mission[0]}</div><span class="eyebrow">A LITTLE OFF-SCREEN ADVENTURE</span><h1>${mission[1]}</h1><div class="game-actions">${button('🔊','mission-speak','class="circle-button" aria-label="Hear mission"')}${button('We did it! 🙌','mission-done','class="primary"')}${button('Another idea','mission','class="secondary"')}</div><p>Take your time. Your playground will be here.</p></main>`;
}

function renderTreasures(){
 return `<main id="main" class="activity-page"><div class="world-title"><span class="world-emoji">⭐</span><h1>Your little treasures</h1><p>Things you made. Places you explored.</p></div><div class="treasure-shelf">${progress.stickers.length?progress.stickers.map(name=>`<span aria-label="${name}">${{star:'⭐',flower:'🌼',rocket:'🚀',rainbow:'🌈',heart:'💜',sun:'☀️'}[name]}</span>`).join(''):'<span>🌱</span>'}</div><div class="photo-grid">${progress.pictures.map(photo=>`<figure><img src="${photo.image}" alt="Your paper drawing"></figure>`).join('')}</div><h2>Your drawing adventures</h2><div class="drawing-library">${DRAWINGS.filter(lesson=>progress.art.includes(lesson.id)).map(lesson=>`<button class="drawing-tile" data-action="drawing" data-drawing="${DRAWINGS.indexOf(lesson)}">${drawingSvg(lesson,lesson.steps.length-1)}<span>${lesson.name}</span></button>`).join('')||'<p>Draw a picture on paper. Its lesson will appear here!</p>'}</div></main>`;
}

// Decode and resize a parent-selected image locally; retain only a small JPEG and never upload the original.
async function addDrawingPhoto(file){
 if(progress.pictures.length>=6)throw new Error('The gallery holds six photos. Remove one in Parent corner before adding another.');
 if(!['image/jpeg','image/png'].includes(file.type)||file.size>15_000_000)throw new Error('Choose a PNG or JPEG under 15 MB.');
 const bitmap=await createImageBitmap(file);
 const scale=Math.min(1,700/Math.max(bitmap.width,bitmap.height));
 const canvas=document.createElement('canvas');canvas.width=Math.round(bitmap.width*scale);canvas.height=Math.round(bitmap.height*scale);
 const context=canvas.getContext('2d');context.fillStyle='#fff';context.fillRect(0,0,canvas.width,canvas.height);context.drawImage(bitmap,0,0,canvas.width,canvas.height);bitmap.close();
 let quality=.75,image=canvas.toDataURL('image/jpeg',quality);
 while(image.length>=250000&&quality>.2){quality-=.1;image=canvas.toDataURL('image/jpeg',quality);}
 if(image.length>=250000)throw new Error('This picture is too detailed to store. Try a smaller image.');
 progress.pictures.push({id:crypto.randomUUID(),image});save();render();notify('Drawing photo saved on this device. Your next backup will include it.');
}

// Rebuild the current view while restoring a matching focused control so keyboard play survives answer updates.
function render(){
 const active=document.activeElement?.closest('[data-action]');
 const previousAction=active?.dataset.action;
 const previousAttributes=active?Object.entries(active.dataset):[];
 document.documentElement.dataset.motion=progress.motion?'on':'off';
 const views={home:renderHome,world:renderWorld,game:renderGame,'art-menu':renderArt,drawing:renderArt,pencil:renderPencil,letters:renderLetters,books:renderBooks,book:renderBooks,complete:renderComplete,parent:renderParent,mission:renderMission,treasures:renderTreasures};
 app.innerHTML=header()+(views[screen]||renderHome)();
 document.title=screen==='home'?'Play Together · A little world of wonder':`${screen==='game'?currentWorld().name:screen==='drawing'?DRAWINGS[drawingIndex].name:'Play Together'} · Learning playground`;
 if(previousAction){
  const replacement=[...app.querySelectorAll('[data-action]')].find(element=>previousAttributes.every(([key,value])=>element.dataset[key]===value));
  if(replacement&&!replacement.disabled)replacement.focus({preventScroll:true});
  else{const main=document.getElementById('main');main.tabIndex=-1;main.focus({preventScroll:true});}
 }
}

function goHome(){stopSpeech();screen='home';daily=false;parentUnlocked=false;render();window.scrollTo(0,0);}
function openWorld(id){stopSpeech();world=id;screen=id==='art'?'art-menu':'world';render();speak(id==='art'?'Choose a picture. Get your paper and pencils ready.':`${currentWorld().name}. Choose a game.`);window.scrollTo(0,0);}
function giveFeedback(message){const feedback=document.getElementById('game-feedback');if(feedback){feedback.textContent=message;feedback.classList.remove('success');}announce(message);speak(message);}

function answerCorrect(){
 if(correct)return;correct=true;sessionEvidence.push({content:activity.id,supported:roundHelp});render();speak('You did it!');
 requestAnimationFrame(()=>document.querySelector('[data-action="next"]')?.focus());
}

function checkAnswer(value){
 if(correct)return;
 if(String(value)===String(activity.answer))answerCorrect();
 else{roundHelp=true;helped=true;giveFeedback('Let’s try together. You can do it.');}
}

function completeSession(){
 sessionBaseline=structuredClone(progress);
 for(const evidence of sessionEvidence)progress=recordObservation(progress,activitySkill(),evidence.content,'supported');
 const sticker=['star','flower','rocket','rainbow','heart','sun'][Math.min(5,progress.stickers.length)];
 if(!progress.stickers.includes(sticker))progress.stickers.push(sticker);
 save();screen='complete';render();speak('Look what you did! High five!');
}

// Help is explicitly marked so a demonstrated answer cannot become independent evidence by accident.
function showHelp(){
 roundHelp=true;helped=true;
 if(world==='words'&&activity.mode==='build'){selectedLetters=[...activity.target.graphemes];render();speak(`This is ${activity.target.word}. Look at the letters. Say the sounds with your grown-up.`);}
 else if(world==='numbers'&&activity.mode==='count'){basket=activity.answer;render();speak(`Count with me. ${Array.from({length:basket},(_,index)=>index+1).join('. ')} apples.`);}
 else if(world==='stories'){selectedFrames=[0,1,2];render();speak(activity.story.frames.map(frame=>frame[1]).join(' '));}
 else{const target=[...document.querySelectorAll('[data-action="answer"]')].find(element=>element.dataset.answer===String(activity.answer));target?.classList.add('hint-highlight');speak(world==='sounds'?`Look at ${activity.answer}. Say it slowly with your grown-up.`:'Look at the glowing choice. Try it together.');}
}

function downloadBackup(value,name){const blob=new Blob([value],{type:'application/json'}),url=URL.createObjectURL(blob),link=document.createElement('a');link.href=url;link.download=name;link.click();setTimeout(()=>URL.revokeObjectURL(url),1000);}

// Central routing keeps actions consistent across mouse and native keyboard activation without global key interception.
app.addEventListener('click',event=>{
 const target=event.target.closest('[data-action]');if(!target||target.disabled)return;
 const action=target.dataset.action;
 if(action==='home'){goHome();return;}
 if(action==='mute'){progress.muted=!progress.muted;stopSpeech();save();render();return;}
 if(action==='parent'){stopSpeech();screen='parent';render();return;}
 if(action==='unlock'){if(document.getElementById('parent-answer').value==='19'){parentUnlocked=true;render();}else notify('Try that sum again.');return;}
 if(action==='world'){daily=false;openWorld(target.dataset.world);return;}
 if(action==='daily'){daily=true;dailyIndex=0;adventureWorlds=dailyWorlds(progress);world=adventureWorlds[0];startActivity('first');return;}
 if(action==='start'){startActivity(target.dataset.mode);return;}
 if(action==='replay'){speak(activity.speech);return;}
 if(action==='answer'){checkAnswer(target.dataset.answer);return;}
 if(action==='letter'&&!correct){if(selectedLetters.length<activity.target.graphemes.length)selectedLetters.push(target.dataset.letter);render();return;}
 if(action==='frame'&&!correct){selectedFrames.push(Number(target.dataset.frame));speak(activity.story.frames[Number(target.dataset.frame)][1]);render();return;}
 if(action==='undo'&&!correct){selectedLetters.pop();selectedFrames.pop();render();return;}
 if(action==='add'&&!correct){basket=Math.min(15,basket+1);render();speak(String(basket));return;}
 if(action==='remove'&&!correct){basket=Math.max(0,basket-1);render();speak(String(basket));return;}
 if(action==='check'){if(world==='words')checkAnswer(selectedLetters.join(''));else if(world==='numbers')checkAnswer(basket);else if(selectedFrames.join(',')==='0,1,2')answerCorrect();else{roundHelp=true;helped=true;giveFeedback('Let’s look at what happens first.');}return;}
 if(action==='help'){showHelp();return;}
 if(action==='story-done'){roundHelp=true;answerCorrect();return;}
 if(action==='next'){if(!correct)return;if(round===3){completeSession();return;}round++;newQuestion(activity.mode);render();speak(activity.speech);return;}
 if(action==='observe'){
  if(sessionBaseline){const rewards=[...progress.stickers];progress=structuredClone(sessionBaseline);for(const evidence of sessionEvidence)progress=recordObservation(progress,activitySkill(),evidence.content,target.dataset.result==='independent'&&evidence.supported?'supported':target.dataset.result);progress.stickers=rewards;save();notify('Observation saved. Demonstrated answers remain supported.');}return;
 }
 if(action==='continue'){if(daily&&dailyIndex<3){dailyIndex++;world=adventureWorlds[dailyIndex];if(world==='art'){screen='art-menu';render();speak('Choose a picture to draw.');}else startActivity(world==='words'?'build':world==='shapes'?'pattern':'count');}else goHome();return;}
 if(action==='break'){stopSpeech();screen='mission';drawingIndex=Math.floor(Math.random()*MISSIONS.length);render();speak('Time for a little break. You can come back whenever you like.');return;}
 if(action==='mission'){screen='mission';drawingIndex=Math.floor(Math.random()*MISSIONS.length);render();speak(MISSIONS[drawingIndex][1]);return;}
 if(action==='mission-speak'){speak(MISSIONS[drawingIndex%MISSIONS.length][1]);return;}
 if(action==='mission-done'){notify('A little real-world adventure. Lovely!');goHome();return;}
 if(action==='drawing'||action==='surprise-art'){drawingIndex=action==='drawing'?Number(target.dataset.drawing):Math.floor(Math.random()*DRAWINGS.length);drawingStep=0;showFinished=false;screen='drawing';render();speak(DRAWINGS[drawingIndex].steps[0][0]);window.scrollTo(0,0);return;}
 if(action==='art-menu'){screen='art-menu';render();return;}
 if(action==='drawing-next'){drawingStep=Math.min(DRAWINGS[drawingIndex].steps.length-1,drawingStep+1);render();speak(DRAWINGS[drawingIndex].steps[drawingStep][0]);return;}
 if(action==='drawing-prev'){drawingStep=Math.max(0,drawingStep-1);render();speak(DRAWINGS[drawingIndex].steps[drawingStep][0]);return;}
 if(action==='drawing-finished'){showFinished=!showFinished;render();return;}
 if(action==='drawing-speak'){speak(showFinished?'Here is the whole picture. Make it yours.':DRAWINGS[drawingIndex].steps[drawingStep][0]);return;}
 if(action==='drawing-done'){if(!progress.art.includes(DRAWINGS[drawingIndex].id))progress.art.push(DRAWINGS[drawingIndex].id);progress=recordObservation(progress,'drawing',DRAWINGS[drawingIndex].id,'supported');save();notify('Your drawing adventure is in My treasures!');speak('You made your very own picture. Tell your grown-up about it.');screen='treasures';render();return;}
 if(action==='pencil'){screen='pencil';render();speak('Choose a path. Copy it on your paper.');return;}
 if(action==='letters'){screen='letters';letterStroke=0;animateLetter=false;render();speak('Choose a letter. Watch it, then try on paper.');return;}
 if(action==='choose-letter'){letter=target.dataset.letter;letterStroke=0;animateLetter=false;render();speak(`Letter ${letter}. Start at the dot.`);return;}
 if(action==='animate-letter'){animateLetter=true;render();speak('Watch the line. Now try on your paper.');return;}
 if(action==='letter-done'){progress=recordObservation(progress,'handwriting','letter-'+letter,'supported');save();notify('Paper practice noted. Well done for having a go!');speak('Well done for having a go!');return;}
 if(action==='letter-prev'||action==='letter-next'){letterStroke=Math.max(0,Math.min(LETTER_MODELS[letter].length-1,letterStroke+(action==='letter-next'?1:-1)));animateLetter=true;render();return;}
 if(action==='books'){screen='books';render();speak('Choose a little book.');return;}
 if(action==='book'){bookIndex=Number(target.dataset.book);bookPage=0;screen='book';render();speak('Try reading this page. Press the speaker if you need help.');return;}
 if(action==='book-prev'||action==='book-next'){bookPage=Math.max(0,Math.min(BOOKS[bookIndex].pages.length-1,bookPage+(action==='book-next'?1:-1)));render();return;}
 if(action==='book-speak'){speak(BOOKS[bookIndex].pages[bookPage][1]);return;}
 if(action==='book-done'){progress=recordObservation(progress,'storytelling','book-'+BOOKS[bookIndex].id,'supported');save();screen='books';render();speak('You read a little book together. Lovely!');return;}
 if(action==='say'){speak(target.dataset.speech);return;}
 if(action==='treasures'){screen='treasures';render();return;}
 if(action==='save-settings'){progress.name=document.getElementById('companion-name').value.trim()||'Pip';progress.avatar=document.getElementById('companion-avatar').value;progress.motion=document.getElementById('motion-setting').checked;save();render();notify('Settings saved.');return;}
 if(action==='export'){downloadBackup(JSON.stringify(progress,null,2),'play-together-backup.json');return;}
 if(action==='export-raw'){downloadBackup(localStorage.getItem(SAVE_KEY)||'{}','play-together-recovery.json');return;}
 if(action==='remove-photo'){if(window.confirm('Remove this drawing photo from this device? Existing exported backups are not changed.')){progress.pictures=progress.pictures.filter(item=>item.id!==target.dataset.photo);save();render();}return;}
 if(action==='auto-level'){progress.skills[target.dataset.skill].override=false;save();render();return;}
});

// Validate imports before replacement and preserve the current save unless the parent explicitly confirms the replacement.
app.addEventListener('change',async event=>{
 const target=event.target;
 if(target.id==='taught-stage'){progress.taughtStage=Number(target.value);save();notify('Taught sound limit updated.');}
 if(target.dataset.skillLevel){const key=target.dataset.skillLevel;progress.skills[key]={...(progress.skills[key]||{evidence:[]}),level:Number(target.value),override:true};save();render();}
 if(target.id==='import-backup'){
  const file=target.files[0];if(!file)return;
  try{if(file.size>3_000_000)throw new Error('This file is too large for a learning backup.');const candidate=validateProgress(JSON.parse(await file.text()));
   if(window.confirm('Replace progress on this device with this backup? Export your current progress first if you want to keep it.')){localStorage.setItem(SAVE_KEY,JSON.stringify(candidate));progress=candidate;storageHealthy=true;storageWarning='';render();notify('Backup restored.');}
  }catch(error){notify(`Nothing was replaced. ${error.message}`);}target.value='';
 }
 if(target.id==='drawing-photo'){
  const file=target.files[0];if(!file)return;
  try{await addDrawingPhoto(file);}catch(error){notify(error.message);}target.value='';
 }
});

window.addEventListener('pagehide',stopSpeech);
document.addEventListener('visibilitychange',()=>{if(document.hidden)stopSpeech();});
render();
if(storageWarning)notify(storageWarning);
if('serviceWorker'in navigator&&location.hostname!=='127.0.0.1'&&location.hostname!=='localhost')navigator.serviceWorker.register('./sw.js').catch(()=>notify('Offline setup is unavailable. You can keep playing online.'));
