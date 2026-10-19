const CACHE='play-together-v2';
const ASSETS=['./','./index.html','./src/app.js','./src/styles.css','./src/fonts.css','./src/content.js','./src/learning.js','./src/drawing.js','./src/handwriting.js','./assets/icon.svg','./manifest.webmanifest',...Array.from({length:9},(_,index)=>`./assets/fonts/font-${index}.ttf`)];
self.addEventListener('install',event=>event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(ASSETS))));
self.addEventListener('activate',event=>event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>key.startsWith('play-together-')&&key!==CACHE).map(key=>caches.delete(key))))));
self.addEventListener('fetch',event=>{
 if(event.request.method!=='GET'||new URL(event.request.url).origin!==self.location.origin)return;
 event.respondWith(fetch(event.request).catch(()=>caches.match(event.request).then(response=>response||new Response('Offline asset unavailable',{status:503}))));
});
