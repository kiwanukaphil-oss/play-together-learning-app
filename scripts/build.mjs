import {mkdir,cp,readFile,writeFile,readdir} from 'node:fs/promises';
import {createHash} from 'node:crypto';

// Include every bundled asset so art/audio updates change the release and cannot disappear when offline.
async function collectPublicAssets(directory){
 const entries=await readdir(directory,{withFileTypes:true}),files=[];
 for(const entry of entries){
  const path=`${directory}/${entry.name}`;
  if(entry.isDirectory())files.push(...await collectPublicAssets(path));
  else files.push(path);
 }
 return files.sort();
}

// Give every module and stylesheet one shared content version so an update cannot combine incompatible cached releases.
async function buildVersionedApp(){
 const sources=(await readdir('src')).filter(file=>/\.(js|css)$/.test(file)).sort();
 const contents=await Promise.all(sources.map(file=>readFile(`src/${file}`,'utf8')));
 const publicAssets=await collectPublicAssets('assets');
 const hash=createHash('sha256').update(contents.join('\n'));
 for(const file of ['index.html','manifest.webmanifest','sw.js',...publicAssets])hash.update(file).update(await readFile(file));
 const version=hash.digest('hex').slice(0,12);
 await mkdir('dist',{recursive:true});
 for(const file of ['index.html','manifest.webmanifest','src','assets'])await cp(file,`dist/${file}`,{recursive:true});
 for(let index=0;index<sources.length;index++){
  let source=contents[index];
  source=source.replace(/(from\s+['"])(\.\/[^'"]+\.js)(['"])/g,`$1$2?v=${version}$3`);
  source=source.replace(/(@import\s+url\(['"])(\.\/[^'"]+\.css)(['"]\))/g,`$1$2?v=${version}$3`);
  source=source.replace(/(\.\.?\/assets\/[^'")\s<>`]+)/g,`$1?v=${version}`);
  await writeFile(`dist/src/${sources[index]}`,source);
 }
 let html=await readFile('index.html','utf8');
 html=html.replaceAll('./src/styles.css',`./src/styles.css?v=${version}`).replaceAll('./src/app.js',`./src/app.js?v=${version}`).replaceAll('./assets/icon.svg',`./assets/icon.svg?v=${version}`);
 await writeFile('dist/index.html',html);
 const assets=['./','./index.html','./assets/icon.svg','./manifest.webmanifest',...sources.map(file=>`./src/${file}?v=${version}`),...publicAssets.map(file=>`./${file}?v=${version}`)];
 let worker=await readFile('sw.js','utf8');
 worker=worker.replace(/const CACHE=.*?;/,`const CACHE='play-together-${version}';`).replace(/const ASSETS=.*?;/,`const ASSETS=${JSON.stringify(assets)};`);
 await writeFile('dist/sw.js',worker);
 console.log(`Built coherent release ${version} in dist/ (${assets.length} offline assets)`);
}
await buildVersionedApp();
