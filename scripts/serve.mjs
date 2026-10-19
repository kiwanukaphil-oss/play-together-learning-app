import {createServer} from 'node:http';
import {readFile,stat} from 'node:fs/promises';
import {resolve,extname,sep} from 'node:path';
const root=resolve(process.env.SERVE_DIST==='1'?'dist':'.');
const types={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.svg':'image/svg+xml','.webmanifest':'application/manifest+json','.json':'application/json'};
// Serve only public application assets; repository metadata and backups must never be exposed by the preview server.
createServer(async(req,res)=>{
 try{
  const urlPath=decodeURIComponent(new URL(req.url,'http://localhost').pathname);
  if(urlPath!=='/'&&!/^\/(src|assets)\/[a-zA-Z0-9/_.-]+$/.test(urlPath)&&!['/index.html','/sw.js','/manifest.webmanifest'].includes(urlPath))throw new Error('Not found');
  const file=resolve(root,'.'+(urlPath==='/'?'/index.html':urlPath));
  if(!file.startsWith(root+sep)||!(await stat(file)).isFile())throw new Error('Not found');
  res.writeHead(200,{'Content-Type':types[extname(file)]||'application/octet-stream','Cache-Control':'no-cache'});res.end(await readFile(file));
 }catch{res.writeHead(404);res.end('Not found');}
}).listen(4173,'127.0.0.1',()=>console.log('Local: http://127.0.0.1:4173'));
