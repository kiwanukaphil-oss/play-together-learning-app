import {writeFile} from 'node:fs/promises';
import {PICNIC_LINES,PICNIC_SCRIPT_VERSION} from '../src/picnic-content.js';

const quote=value=>`"${String(value??'').replaceAll('"','""')}"`;
const columns=['id','script_version','speaker','text','direction','file','duration_seconds','review','provider_or_performer','rights','reviewer','review_date'];
const rows=Object.entries(PICNIC_LINES).map(([id,line])=>[id,PICNIC_SCRIPT_VERSION,line.speaker,line.text,line.direction,line.file,line.duration,line.review,'','','','']);
await writeFile('docs/PICNIC_RECORDING_SCRIPT.csv',[columns,...rows].map(row=>row.map(quote).join(',')).join('\r\n')+'\r\n','utf8');
console.log(`Exported ${rows.length} exact lines for audition/production. All review fields remain explicit.`);
