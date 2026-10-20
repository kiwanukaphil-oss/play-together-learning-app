// Original editable artwork: separate facial/body layers let the story respond without replacing the entire illustration.
export function picnicCharacter(character='pip',pose='attentive'){
 const bear=character==='bear',fur=bear?'#b77c50':'#ecaa55',shade=bear?'#8f583b':'#d9853d';
 const gaze=pose==='attentive'?(bear?3:-3):0;
 const smile=pose==='speaking'?'<ellipse cx="130" cy="135" rx="9" ry="12" fill="#443142"/>':pose==='thinking'?'<path d="M120 140q10-5 20 0" fill="none" stroke="#443142" stroke-width="4" stroke-linecap="round"/>':'<path d="M116 134q14 19 28 0" fill="none" stroke="#443142" stroke-width="4" stroke-linecap="round"/>';
 const ears=bear?'<circle cx="77" cy="58" r="26"/><circle cx="183" cy="58" r="26"/><g fill="#dba17b"><circle cx="77" cy="58" r="14"/><circle cx="183" cy="58" r="14"/></g>':'<path d="M69 85 61 18 113 57M153 57 202 18 194 91Z"/><path d="m75 64-5-30 26 24m70 0 24-24-3 32" fill="#df8a77"/>';
 return `<svg viewBox="0 0 260 320" class="picnic-character pose-${pose} ${character}" aria-hidden="true"><ellipse cx="130" cy="302" rx="81" ry="11" fill="#162d35" opacity=".18"/>
 ${!bear?'<path d="M181 255c80 23 62-89 25-66" fill="none" stroke="#d9853d" stroke-width="24" stroke-linecap="round"/>':''}
 <g fill="${fur}"><ellipse cx="130" cy="227" rx="${bear?77:61}" ry="78"/><ellipse cx="91" cy="289" rx="31" ry="17"/><ellipse cx="171" cy="289" rx="31" ry="17"/>
 <g class="character-arm"><ellipse cx="61" cy="218" rx="21" ry="45" transform="rotate(19 61 218)"/></g><ellipse cx="201" cy="215" rx="20" ry="42" transform="rotate(-23 201 215)"/>
 ${bear?'<path d="M92 170h76l18 103q-56 17-110 0Z" fill="#fff0d3"/><path d="M101 171v-20m57 20v-20" stroke="#fff0d3" stroke-width="12"/><rect x="111" y="223" width="39" height="32" rx="10" fill="#edb85b"/>':'<ellipse cx="130" cy="226" rx="34" ry="43" fill="#ffdfaa"/>'}
 <g class="character-head">${ears}<ellipse cx="130" cy="105" rx="${bear?76:73}" ry="66"/>
 ${!bear?'<path d="m110 45 5 19m15-22v20m20-17-5 19" stroke="#be7039" stroke-width="9" stroke-linecap="round"/>':''}
 <ellipse cx="130" cy="128" rx="43" ry="31" fill="#ffe4bd"/>
 <g fill="#342c38"><ellipse cx="${102+gaze}" cy="104" rx="5.5" ry="7"/><ellipse cx="${158+gaze}" cy="104" rx="5.5" ry="7"/></g>
 ${pose==='thinking'?'<path d="M94 86q8-6 16-1" stroke="#73513c" stroke-width="3" fill="none" stroke-linecap="round"/>':''}
 <g fill="#fff7e6"><circle cx="100" cy="101" r="1.7"/><circle cx="156" cy="101" r="1.7"/></g>
 <path d="M121 121q9-6 18 0l-9 8Z" fill="#634147"/>${smile}
 <ellipse cx="84" cy="124" rx="10" ry="5" fill="#df886d" opacity=".6"/><ellipse cx="176" cy="124" rx="10" ry="5" fill="#df886d" opacity=".6"/>
 ${!bear?'<path d="m91 132-30-5m30 15-28 5m106-15 30-5m-30 15 28 5" stroke="#845137" stroke-width="2.5" stroke-linecap="round"/>':''}</g></g>
 ${!bear?'<path d="M87 159q42 20 86 0l-18 34-24-11-17 17Z" fill="#387d7b"/><path d="m129 181 21 4-9 27-15-23Z" fill="#286465"/>':''}
 <path d="M${bear?69:83} 260q10 15 23 16" stroke="${shade}" stroke-width="3" opacity=".45" fill="none"/></svg>`;
}

export function picnicApple(){
 return '<svg viewBox="0 0 90 100" class="picnic-apple" aria-hidden="true"><ellipse cx="45" cy="92" rx="27" ry="5" fill="#463643" opacity=".12"/><path d="M44 29C7 6 1 58 18 80q13 18 28 7c15 10 33-3 37-24C91 23 63 12 44 29Z" fill="#da6254"/><path d="M44 29C7 6 1 58 18 80q9 13 20 10C20 63 30 38 44 29Z" fill="#ec8470"/><path d="m44 30 3-19" stroke="#735035" stroke-width="6" stroke-linecap="round"/><path d="M49 19q4-23 25-14-5 21-25 14" fill="#5a9178"/><path d="M21 39q-5 9-4 17" fill="none" stroke="#ffd0a9" stroke-width="5" stroke-linecap="round"/></svg>';
}

export function picnicObject(name){
 const shapes={
  map:'<path d="m25 35 55-15 50 15 45-15v125l-45 15-50-15-55 15Z" fill="#f7e8bc" stroke="#be9c60" stroke-width="3"/><path d="M80 20v125m50-110v125" stroke="#d6c28b" stroke-width="2"/><path d="M48 124c70-90 7-35 99-76" stroke="#c48462" stroke-width="5" stroke-dasharray="6 8" fill="none"/><path d="m137 46 20 15m-20 0 20-15" stroke="#a75d54" stroke-width="5"/><path d="m43 70 13-25 14 25Z" fill="#648d79"/>',
  mat:'<path d="m30 40 145-9 4 117-145 8Z" fill="#e6ad65" stroke="#ac7950" stroke-width="3"/><path d="m55 40 4 112m30-114 4 110m30-113 4 112m30-111 4 110M32 65l144-10M33 93l144-10M34 124l144-10" stroke="#fbdfaa" stroke-width="8"/><path d="m22 50 10-1m-10 25 10-1m-10 25 10-1m-10 25 10-1m147-75 12-1m-11 26 12-1m-11 26 12-1m-11 26 12-1" stroke="#ac7950" stroke-width="3"/>',
  pan:'<path d="m110 100 63-55" stroke="#97643f" stroke-width="20" stroke-linecap="round"/><ellipse cx="80" cy="116" rx="61" ry="42" fill="#3f5b62"/><ellipse cx="80" cy="105" rx="61" ry="40" fill="#708e92" stroke="#b0c1b7" stroke-width="6"/><ellipse cx="80" cy="105" rx="46" ry="27" fill="#4e6a71"/>',
  star:'<path d="m100 20 22 47 53 7-38 37 9 54-46-25-46 25 9-54-38-37 53-7Z" fill="#f3c566" stroke="#c18d44" stroke-width="4"/>',
  leaf:'<path d="M49 154C-3 66 104 13 171 25c7 81-30 135-122 129Z" fill="#7ca487"/><path d="m48 155 87-97M81 119l-10-40m40 14 33-3" fill="none" stroke="#416d61" stroke-width="5" stroke-linecap="round"/>',
  flower:'<g fill="#dda0a6"><ellipse cx="100" cy="55" rx="25" ry="37"/><ellipse cx="100" cy="139" rx="25" ry="37"/><ellipse cx="58" cy="97" rx="37" ry="25"/><ellipse cx="142" cy="97" rx="37" ry="25"/></g><circle cx="100" cy="97" r="26" fill="#f7cc77"/>',
 };
 return `<svg viewBox="0 0 200 185" class="picnic-object" aria-hidden="true">${shapes[name]||shapes.star}</svg>`;
}

export function picnicLantern(){
 return '<svg viewBox="0 0 130 200" class="picnic-lantern" aria-hidden="true"><path d="M40 50V29a25 25 0 0 1 50 0v21" fill="none" stroke="#634e49" stroke-width="7"/><path d="M27 55h76l-8 115H35Z" fill="#f6c773" stroke="#b57b48" stroke-width="5"/><path d="m51 56-3 113m32-113 3 113" stroke="#ffe8b1" stroke-width="5"/><path d="M24 52h82M32 171h66" stroke="#865a40" stroke-width="11" stroke-linecap="round"/><path d="m65 86 6 14 16 2-12 10 3 16-13-8-13 8 3-16-12-10 16-2Z" fill="#fff4ce"/></svg>';
}
