import {readdir} from 'node:fs/promises';
import {execFileSync} from 'node:child_process';

const modules=(await readdir('src')).filter(file=>file.endsWith('.js'));
for(const file of [...modules.map(file=>`src/${file}`),'sw.js'])execFileSync(process.execPath,['--check',file],{stdio:'inherit'});
console.log(`Syntax checked ${modules.length} application modules and service worker.`);
