import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {runInNewContext} from 'node:vm';

// Exercise the actual service-worker handler with a failed network, rather than assuming page-level throttling affects workers.
async function offlineWorker(cachedResponse){
 const handlers={};
 runInNewContext(await readFile('sw.js','utf8'),{
  self:{location:{origin:'https://play.example'},addEventListener:(name,handler)=>handlers[name]=handler},
  fetch:async()=>{throw new Error('Network unavailable');},
  caches:{match:async()=>cachedResponse},URL,Request,Response,
 });
 return handlers;
}
test('network failure returns the cached application response',async()=>{
 const handlers=await offlineWorker(new Response('cached application'));
 let response;
 handlers.fetch({request:new Request('https://play.example/src/app.js?v=release'),respondWith:value=>response=value});
 assert.equal(await (await response).text(),'cached application');
});
test('missing offline assets return an explicit unavailable response and external requests are not intercepted',async()=>{
 const handlers=await offlineWorker(undefined);
 let response;
 handlers.fetch({request:new Request('https://play.example/missing'),respondWith:value=>response=value});
 assert.equal((await response).status,503);
 let intercepted=false;
 handlers.fetch({request:new Request('https://elsewhere.example/'),respondWith:()=>intercepted=true});
 assert.equal(intercepted,false);
});
