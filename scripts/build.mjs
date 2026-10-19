import {mkdir,cp} from 'node:fs/promises';
await mkdir('dist',{recursive:true});
for(const file of ['index.html','manifest.webmanifest','sw.js','src','assets'])await cp(file,`dist/${file}`,{recursive:true});
console.log('Built static app in dist/');
