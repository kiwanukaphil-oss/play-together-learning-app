export const WORLDS = [
  { id:'sounds', name:'Sound Safari', short:'Listen', icon:'🦁', colour:'orange', description:'Listen. Look. Discover!', skill:'listening' },
  { id:'words', name:'Word Workshop', short:'Build', icon:'🚂', colour:'purple', description:'Little letters. Big adventures.', skill:'spelling' },
  { id:'numbers', name:'Number Kitchen', short:'Count', icon:'🍓', colour:'pink', description:'Something yummy is counting on you.', skill:'number' },
  { id:'shapes', name:'Shape Builders', short:'Make', icon:'🚀', colour:'blue', description:'Imagine it. Build it!', skill:'patterns' },
  { id:'stories', name:'Story Theatre', short:'Tell', icon:'🎭', colour:'teal', description:'Every picture has a story.', skill:'storytelling' },
  { id:'art', name:'Art Treehouse', short:'Draw', icon:'🎨', colour:'yellow', description:'Your paper. Your imagination.', skill:'drawing' },
];

// Each word carries its actual prerequisite spellings; the starter sequence deliberately excludes irregular words.
export const WORDS = [
 ['sat','🪑'],['mat','▰'],['sit','🪑'],['pat','✋'],['tap','🚰'],['pin','📍'],['pan','🍳'],['nap','😴'],
 ['map','🗺️'],['man','👨'],['cat','🐈'],['cap','🧢'],['can','🥫'],['dog','🐕'],['dig','⛏️'],['dot','🔵'],
 ['pot','🫕'],['top','🌀'],['cot','🛏️'],['pig','🐷'],['sun','☀️'],['cup','☕'],['mug','🍵'],['mud','🟤'],
 ['bug','🐞'],['bus','🚌'],['run','🏃'],['rug','▰'],['hen','🐔'],['pen','🖊️'],['pet','🐈'],['net','🥅'],
 ['bed','🛏️'],['red','🔴'],['leg','🦵'],['ten','🔟'],['hat','🎩'],['hot','🥵'],['hop','🐇'],['hut','🛖'],
 ['fan','🪭'],['fin','🐟'],['fit','👕'],['fox','🦊'],['box','📦'],['van','🚐'],['vet','🧑‍⚕️'],['win','🏆'],
 ['wet','💧'],['wig','💇'],['web','🕸️'],['jam','🫙'],['jet','✈️'],['jug','🏺'],['zip','🤐'],['yes','👍'],
 ['ship','🚢'],['shop','🏪'],['fish','🐟'],['dish','🍽️'],['chip','🍟'],['chin','🙂'],['chop','🪓'],['rich','💰'],
 ['thin','📏'],['thick','📚'],['bath','🛁'],['ring','💍'],['sing','🎤'],['king','👑'],['wing','🪽'],['duck','🦆'],
 ['sock','🧦'],['rock','🪨'],['back','🎒'],['rain','🌧️'],['tail','🐈'],['mail','✉️'],['seed','🌱'],['feet','🦶'],
 ['moon','🌙'],['food','🥣'],['boat','⛵'],['coat','🧥'],['goat','🐐'],['star','⭐'],['car','🚗'],['farm','🏡'],
].map(([word,picture],index)=>({id:`word-${word}`,word,picture,stage:index<10?0:index<40?1:index<56?2:index<72?3:4,graphemes:word.match(/sh|ch|th|ng|ck|ai|ee|oo|oa|ar|./g),review:'draft-parent-review',version:1}));

export const SOUND_GROUPS = [
 {sound:'s', cue:'ssss', items:[['sun','☀️'],['sock','🧦'],['snake','🐍']]},
 {sound:'m', cue:'mmm', items:[['moon','🌙'],['mouse','🐭'],['mug','☕']]},
 {sound:'t', cue:'t', items:[['tiger','🐯'],['turtle','🐢'],['tomato','🍅']]},
 {sound:'p', cue:'p', items:[['pig','🐷'],['pear','🍐'],['penguin','🐧']]},
 {sound:'c', cue:'k', items:[['cat','🐈'],['car','🚗'],['cup','☕']]},
 {sound:'d', cue:'d', items:[['dog','🐕'],['duck','🦆'],['door','🚪']]},
 {sound:'b', cue:'b', items:[['ball','⚽'],['bear','🐻'],['banana','🍌']]},
 {sound:'f', cue:'fff', items:[['fish','🐟'],['fox','🦊'],['flower','🌸']]},
];

export const STORIES = [
 {id:'seed',name:'A tiny seed',frames:[['🌰','Plant a seed.'],['🌧️','Give it water.'],['🌻','A flower grows!']]},
 {id:'picnic',name:'Picnic time',frames:[['🧺','Pack the basket.'],['🌳','Find a shady tree.'],['🥪','Share your lunch.']]},
 {id:'morning',name:'Hello, sunshine',frames:[['🛏️','Wake up.'],['🪥','Brush your teeth.'],['🎒','Get ready to go.']]},
 {id:'rain',name:'A rainy day',frames:[['☁️','Clouds fill the sky.'],['🌧️','Rain begins to fall.'],['🌈','A rainbow appears.']]},
 {id:'cake',name:'Bake together',frames:[['🥣','Mix the ingredients.'],['🧁','Bake the cakes.'],['😋','Enjoy a little cake.']]},
 {id:'tower',name:'Up, up, up!',frames:[['🧱','Find your blocks.'],['🏰','Build a tall tower.'],['🧸','Give your toy a home.']]},
 {id:'butterfly',name:'A little change',frames:[['🐛','A caterpillar eats leaves.'],['🟤','It forms a chrysalis.'],['🦋','A butterfly emerges.']]},
 {id:'drawing',name:'An artist at work',frames:[['✏️','Pick up a pencil.'],['🖼️','Draw your picture.'],['🎁','Give it to someone you love.']]},
];

export const MISSIONS = [
 ['🧱','Find four blocks. Build a tower. Count each block.'],['👏','Clap twice. Stamp once. Can you repeat the pattern?'],
 ['🔵','Find something shaped like a circle. Draw it on paper.'],['🧸','Put a toy under a chair, then beside the chair.'],
 ['✋','Show three fingers. Find another way to show three.'],['🖍️','Draw a big circle and a little circle. Turn them into a creature.'],
 ['🍽️','Give each toy one pretend snack. Does everyone have one?'],['📏','Find two pencils. Which one is longer?'],
 ['🦶','Take five little steps. Count each step.'],['📚','Choose a picture book. Tell your grown-up what you see.'],
 ['🪨','Find five safe objects. Make two groups. Count them altogether.'],['🌼','Draw a flower with five petals. Colour it your way.'],
];

export const SKILLS = {
 listening:{name:'Listening & sounds',steps:['Hear first sounds','Blend spoken sounds','Separate sounds','Listen for middle and ending sounds']},
 spelling:{name:'Reading & spelling',steps:['Starter sounds: s a t p i n m','Short words: c d g o u e r h b','More single letters','sh ch th ng ck','Selected vowel patterns']},
 number:{name:'Numbers & operations',steps:['Count to five','Compare and count to ten','Join small groups','Take away','Make and split totals']},
 patterns:{name:'Shapes & patterns',steps:['Name simple shapes','Continue a pattern','Compare shapes','Position and measurement']},
 storytelling:{name:'Stories & language',steps:['Talk about pictures','Order three events','Tell your own ending','Read together']},
 drawing:{name:'Drawing & writing',steps:['Lines and shapes','Copy a picture','Add your own details','Label your drawing']},
};
