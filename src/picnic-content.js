// Authored examples remain draft until human teaching/audio review; random layouts are not extra content coverage.
export const PICNIC_WORDS=[
 {id:'map',letters:['m','a','p'],bank:['p','s','m','a','t'],stage:0,purpose:'A map to our picnic',success:'A map! Now we can find our picnic spot.'},
 {id:'mat',letters:['m','a','t'],bank:['t','n','a','m','p'],stage:0,purpose:'A mat for our friends',success:'A mat! A cosy place for our friends to sit.'},
 {id:'pan',letters:['p','a','n'],bank:['n','m','p','a','s'],stage:0,purpose:'A pan for Bear',success:'A pan! Bear can get our picnic ready.'},
];
export const PICNIC_COUNTS=[
 {id:'one-on-cloth',total:1,layout:'row'},
 {id:'two-together',total:2,layout:'row'},
 {id:'three-in-row',total:3,layout:'row'},
 {id:'four-in-pairs',total:4,layout:'pairs'},
 {id:'five-in-row',total:5,layout:'row'},
 {id:'five-staggered',total:5,layout:'staggered'},
];
export const PICNIC_SHARES=[{id:'share-two',total:2},{id:'share-four',total:4},{id:'share-six',total:6}];
export const LANTERN_STEPS=[
 {id:'rim',text:'Draw a short line across your paper.',path:'M80 80H200',start:[80,80]},
 {id:'body',text:'Draw down, across, and up. There is your lantern.',path:'M90 80V210H190V80',start:[90,80]},
 {id:'handle',text:'Add a curved handle at the top.',path:'M108 80C108 15 172 15 172 80',start:[108,80]},
 {id:'pattern',text:'Give your lantern a stripe. Or invent your own pattern.',path:'M105 125H175 M105 170H175',start:[105,125]},
];
export const ROUND_LANTERN_STEPS=[
 {id:'round-body',text:'Draw a big circle for your lantern.',path:'M140 65a70 70 0 1 1-1 0',start:[140,65]},
 {id:'round-handle',text:'Add a little curved handle on top.',path:'M117 68C112 20 168 20 163 68',start:[117,68]},
 {id:'round-pattern',text:'Add a stripe, or a pattern of your own.',path:'M86 135H194',start:[86,135]},
];
export const picnicPaperSteps=state=>state.paperVariant==='round'?ROUND_LANTERN_STEPS:LANTERN_STEPS;
const line=(speaker,text,direction='Warm, clear, conversational.')=>({speaker,text,direction,file:null,duration:null,review:'draft'});
export const PICNIC_LINES={
 welcome:line('bear','A little picnic, under the moon. Will you help us get ready?','A small smile; pause after picnic.'),
 resume:line('pip','Our picnic is waiting. Shall we carry on?'),
 exit:line('pip','We can leave our picnic here. Come back whenever you like.'),
 'word-help-1':line('pip','Listen to the word again. Which letter comes next?'),
 'word-help-2':line('pip','Here is one letter to help. Check the word when you are ready.'),
 'word-help-3':line('pip','Keep the letters that fit. Let’s look at this space together.'),
 'word-retry':line('pip','Some letters need another look. The letters that fit can stay.'),
 'pack-few':line('bear','Our basket needs a little more. Count the apples, then add some.'),
 'pack-many':line('bear','There are too many apples. Count them, then take some out.'),
 'pack-help-1':line('bear','Count each apple in the basket. How many are there?'),
 'pack-help-2':line('bear','I’ll move one apple. You can finish getting the basket ready.'),
 'pack-help-3':line('bear','Let’s count the basket together, one apple at a time.'),
 'pack-success-1':line('bear','Just enough apples. Our basket is ready.'),
 'pack-success-2':line('bear','That is the number we need. Let’s take our basket.'),
 'pack-success-3':line('bear','You checked the apples. We are ready for our picnic.'),
 share:line('bear','Give Pip and me the same number of apples. Use all the apples.'),
 'share-retry':line('bear','Let’s look at both plates. Does each friend have the same number?'),
 'share-help-1':line('bear','Try giving one apple to Pip, then one to me.'),
 'share-help-2':line('bear','I’ll move one apple to help make the plates the same.'),
 'share-help-3':line('bear','Count each plate. You can move an apple back if you need to.'),
 'share-success-1':line('pip','The same for each of us. Our picnic is ready.'),
 'share-success-2':line('pip','Two happy plates. We both have the same number.'),
 'share-success-3':line('pip','All shared out. Thank you for checking both plates.'),
 paper:line('pip','Get some paper and a pencil. Let’s draw a lantern for our picnic.'),
 'paper-extension-1':line('pip','What pattern will your lantern have? You can invent one.'),
 'paper-extension-2':line('pip','Who could carry your lantern? Draw a little creature beside it.'),
 'ending-drawn':line('bear','The food is ready, and you made a lantern on paper. A lovely little picnic.'),
 'ending-skipped':line('bear','The food is ready. A lovely little picnic, under the moon.'),
 decoration:line('pip','Choose a little decoration for our picnic.'),
};
for(const word of PICNIC_WORDS){
 PICNIC_LINES[`word-${word.id}`]=line('pip',`Let’s make ${word.id}. Choose the letters for ${word.id}.`);
 PICNIC_LINES[`word-success-${word.id}`]=line('pip',word.success,'Delighted discovery, not shouting.');
}
for(const count of PICNIC_COUNTS)PICNIC_LINES[`pack-${count.id}`]=line('bear',`Put ${count.total} ${count.total===1?'apple':'apples'} in the basket.`);
for(const share of PICNIC_SHARES)PICNIC_LINES[`share-start-${share.id}`]=line('bear',`I brought ${share.total} more apples. Share these between Pip and me. Give us the same number.`);
for(let count=0;count<=6;count++)PICNIC_LINES[`count-${count}`]=line('bear',String(count),'Clear number, short and dry.');
for(const step of [...LANTERN_STEPS,...ROUND_LANTERN_STEPS])PICNIC_LINES[`paper-${step.id}`]=line('pip',step.text,'One stroke instruction, then wait.');
export const PICNIC_SCRIPT_VERSION=1;
