import test from 'node:test';
import assert from 'node:assert/strict';
import {execFileSync} from 'node:child_process';
import {readFile} from 'node:fs/promises';

// Regression for a real mixed-cache failure: every requested JS/CSS/font URL must belong to the same release manifest.
test('production modules, styles and offline cache share one content version',async()=>{
 execFileSync(process.execPath,['scripts/build.mjs']);
 const html=await readFile('dist/index.html','utf8');
 const version=html.match(/app\.js\?v=([a-f0-9]+)/)[1];
 const app=await readFile('dist/src/app.js','utf8');
 const worker=await readFile('dist/sw.js','utf8');
 assert.match(worker,new RegExp(`play-together-${version}`));
 const imports=[...app.matchAll(/from ['"]\.\/([^'"]+)['"]/g)].map(match=>match[1]);
 assert.ok(imports.length>=4);
 for(const path of imports){assert.ok(path.endsWith(`?v=${version}`));assert.ok(worker.includes(`./src/${path}`));}
 const styles=await readFile('dist/src/styles.css','utf8');assert.ok(styles.includes(`fonts.css?v=${version}`));
 const fonts=await readFile('dist/src/fonts.css','utf8');assert.equal([...fonts.matchAll(/\.ttf\?v=/g)].length,9);
});
