import {validate} from './world.js?v=realm3';
const allowed=['auto','slot1','slot2','slot3'];
export function openDB(name='sanguo-life-independent-v2'){return new Promise((resolve,reject)=>{const r=indexedDB.open(name,1);r.onupgradeneeded=()=>r.result.createObjectStore('saves');r.onsuccess=()=>resolve(r.result);r.onerror=()=>reject(r.error);r.onblocked=()=>reject(Error('資料庫被其他分頁阻擋，請關閉其他遊戲分頁。'));});}
export async function writeSlot(slot,state){if(!allowed.includes(slot))throw Error('無效存檔槽');const safe=validate(state),db=await openDB();try{await new Promise((resolve,reject)=>{const t=db.transaction('saves','readwrite');t.objectStore('saves').put({savedAt:new Date().toISOString(),state:safe},slot);t.oncomplete=resolve;t.onerror=()=>reject(t.error);t.onabort=()=>reject(t.error??Error('保存已中止'));});}finally{db.close();}}
async function readFromDB(slot,name){if(!allowed.includes(slot))throw Error('無效存檔槽');const db=await openDB(name);try{return await new Promise((resolve,reject)=>{const t=db.transaction('saves'),r=t.objectStore('saves').get(slot);r.onsuccess=()=>{try{resolve(r.result?{...r.result,state:validate(r.result.state)}:null);}catch(e){reject(e);}};r.onerror=()=>reject(r.error);});}finally{db.close();}}
export async function readSlot(slot){return await readFromDB(slot,'sanguo-life-independent-v2')??await readFromDB(slot,'sanguo-life-independent-v1');}
export function exportJSON(s){return JSON.stringify({format:'sanguo-life-backup',version:s.schemaVersion,state:validate(s)},null,2);}
export function importJSON(text){if(text.length>1000000)throw Error('備份超過1MB上限。');const x=JSON.parse(text);if(x?.format!=='sanguo-life-backup'||![1,2].includes(x.version)||x.state?.schemaVersion!==x.version)throw Error('不支援的備份版本；未覆蓋目前進度。');return validate(x.state);}

export function readLegacySlot(slot){return readFromDB(slot,"sanguo-life-independent-v1");}
