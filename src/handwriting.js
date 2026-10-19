// Generic, single-storey manuscript models. Schools differ; parents should compare these with the child's school style.
export const LETTER_MODELS={
 a:['M145 100 C90 55 55 105 65 150 C75 195 145 175 145 125 L145 85 L145 175'],
 b:['M70 35 L70 175','M70 120 C100 55 160 90 155 135 C150 185 90 195 70 150'],
 c:['M150 100 C90 60 55 105 65 150 C80 185 125 190 150 165'],
 d:['M145 100 C90 55 55 105 65 150 C75 195 145 175 145 125','M145 35 L145 175'],
 e:['M65 130 L155 130 C155 70 65 75 65 130 C65 185 130 190 155 165'],
 f:['M145 45 C110 20 90 40 90 75 L90 175','M60 95 L135 95'],
 g:['M145 100 C90 55 55 105 65 150 C75 195 145 175 145 125','M145 85 L145 195 C145 240 85 235 75 215'],
 h:['M70 35 L70 175','M70 125 C75 80 145 70 145 120 L145 175'],
 i:['M105 85 L105 175','M105 48 L105 51'],
 j:['M130 85 L130 195 C130 230 80 235 70 210','M130 48 L130 51'],
 k:['M75 35 L75 175','M145 85 L78 135 L150 175'],
 l:['M105 35 L105 175'],
 m:['M50 85 L50 175','M50 120 C55 75 105 75 105 120 L105 175','M105 120 C110 75 160 75 160 120 L160 175'],
 n:['M70 85 L70 175','M70 120 C75 75 145 75 145 120 L145 175'],
 o:['M145 105 C110 65 65 85 65 130 C65 185 150 195 155 135 C158 120 152 110 145 105'],
 p:['M70 85 L70 230','M70 115 C95 70 155 85 155 130 C155 180 95 190 70 150'],
 q:['M145 100 C90 55 55 105 65 150 C75 195 145 175 145 125','M145 85 L145 230'],
 r:['M75 85 L75 175','M75 125 C85 80 120 75 145 95'],
 s:['M150 100 C110 65 65 90 75 120 C85 140 145 125 145 155 C145 185 95 195 65 165'],
 t:['M100 45 L100 150 C100 180 125 185 145 170','M65 95 L145 95'],
 u:['M65 85 L65 140 C65 195 145 185 145 135 L145 85 L145 175'],
 v:['M60 85 L105 175 L155 85'],
 w:['M40 85 L75 175 L110 105 L145 175 L180 85'],
 x:['M60 85 L155 175','M155 85 L60 175'],
 y:['M65 85 L105 170','M155 85 L85 230'],
 z:['M65 85 L155 85 L65 175 L155 175'],
};

export function letterSvg(letter,stroke,animate=false){
 const strokes=LETTER_MODELS[letter],start=strokes[stroke].match(/^M(\d+) (\d+)/);
 return `<svg class="letter-model" viewBox="0 0 220 260" role="img" aria-label="Lowercase ${letter}, stroke ${stroke+1} of ${strokes.length}"><path d="M15 35 H205 M15 85 H205 M15 175 H205 M15 230 H205" stroke="#e6ddf2" stroke-width="2" stroke-dasharray="5 5"/><g fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="11">${strokes.map(path=>`<path d="${path}" stroke="#ece6f4"/>`).join('')}${strokes.slice(0,stroke+1).map((path,index)=>`<path d="${path}" stroke="${index===stroke?'#8052c7':'#50406b'}" pathLength="1" class="${animate&&index===stroke?'stroke-animation':''}"/>`).join('')}</g><circle cx="${start[1]}" cy="${start[2]}" r="7" fill="#f1a741" stroke="white" stroke-width="2"/></svg>`;
}
