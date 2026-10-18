import {RULES,origins,abilities,cityIds,cities,routes} from './data.js';
export const date=t=>`${RULES.startYear+Math.floor(t/36)}年${Math.floor(t%36/3)+1}月${['上','中','下'][t%3]}旬`;
export const age=(s,p)=>p.initialAge+Math.floor(s.tick/36);
export function createWorld(input){
 if(typeof input.name!=='string'||!input.name.trim()||input.name.trim().length>12||!['male','female'].includes(input.gender)||!Object.hasOwn(origins,input.origin)||!Object.hasOwn(cities,input.city)||!Array.isArray(input.points)||input.points.length!==5||input.points.some(n=>!Number.isInteger(n)||n<0||n>20)||input.points.reduce((a,b)=>a+b,0)!==RULES.points)throw Error('請填寫姓名（1–12字）並分配全部20點。');
 const player={id:'player',name:input.name.trim(),gender:input.gender,originId:input.origin,initialAge:RULES.startAge,cityId:input.city,travel:null,abilities:input.points.map(n=>RULES.baseAbility+n),status:'unaffiliated',alive:true};
 const s={schemaVersion:1,tick:0,playerId:'player',persons:{player,'npc-1':{id:'npc-1',name:'沈禾',initialAge:25,cityId:'yingchuan',alive:true},'npc-2':{id:'npc-2',name:'杜衡',initialAge:31,cityId:'chenliu',alive:true}},assets:{private:{...origins[input.origin]},group:{money:0,food:0},public:Object.fromEntries(cityIds.map(id=>[id,{money:500,food:800,troops:200}]))},intel:{},logs:[]};
 observe(s); log(s,'以在野之身展開人生。'); return s;
}
function log(s,message){s.logs.push({tick:s.tick,message});s.logs=s.logs.slice(-200);}
export function observe(s){const p=s.persons.player;if(p.travel)return;const id=p.cityId;s.intel[id]={cityId:id,obtainedTick:s.tick,source:'親自抵達／在地見聞',confidence:'確定（取得時）',money:s.assets.public[id].money,food:s.assets.public[id].food,troops:s.assets.public[id].troops};}
export function routeTo(s,id){const p=s.persons.player;return routes.find(r=>(r.a===p.cityId&&r.b===id)||(r.b===p.cityId&&r.a===id));}
export function startTravel(s,id){const p=s.persons.player,r=routeTo(s,id);if(p.travel||!r)throw Error('目前無法沿此路線旅行。');if(s.assets.private.money<r.money||s.assets.private.food<r.food)throw Error('私人金錢或糧食不足。');s.assets.private.money-=r.money;s.assets.private.food-=r.food;p.travel={from:p.cityId,to:id,remaining:r.turns,total:r.turns};log(s,`出發前往${cities[id].name}，支付${r.money}錢、${r.food}糧；預計${r.turns}旬。`);}
export function advance(s){s.tick++;for(const p of Object.values(s.persons)){if(p.id==='player')continue;const i=cityIds.indexOf(p.cityId);if((s.tick+Number(p.id.slice(-1)))%2===0){const next=cityIds[(i+1)%cityIds.length];p.cityId=next; if(s.persons.player.cityId===next&&!s.persons.player.travel)log(s,`${p.name}來到本地（原創NPC示例活動）。`);}}
 for(const id of cityIds){s.assets.public[id].money+=2;s.assets.public[id].food+=3;}
 const p=s.persons.player;if(p.travel){p.travel.remaining--;if(p.travel.remaining===0){p.cityId=p.travel.to;p.travel=null;log(s,`抵達${cities[p.cityId].name}。`);}}observe(s);log(s,'本旬結束，各地同步活動。');return s;}
export function visibleCity(s,id){return {city:cities[id],intel:s.intel[id]??null};}
export function validate(s){
 const fail=()=>{throw Error('備份格式或資料關聯不正確，現有進度未變更。');};
 if(!s||s.schemaVersion!==1||!Number.isSafeInteger(s.tick)||s.tick<0||s.tick>360000||s.playerId!=='player'||!s.persons||!s.assets||!s.intel||!Array.isArray(s.logs)||s.logs.length>200)fail();
 const num=n=>Number.isSafeInteger(n)&&n>=0&&n<=1e9;
 for(const [id,p]of Object.entries(s.persons)){if(!p||p.id!==id||typeof p.name!=='string'||p.name.length<1||p.name.length>12||!num(p.initialAge)||!Object.hasOwn(cities,p.cityId)||p.alive!==true)fail();}
 if(Object.keys(s.persons).sort().join(',')!=='npc-1,npc-2,player')fail();
 const p=s.persons.player;if(!p||!['male','female'].includes(p.gender)||!Object.hasOwn(origins,p.originId)||p.status!=='unaffiliated'||!Array.isArray(p.abilities)||p.abilities.length!==5||p.abilities.some(n=>!Number.isInteger(n)||n<40||n>60)||p.abilities.reduce((a,b)=>a+b,0)!==220)fail();
 if(p.travel){const t=p.travel,r=routes.find(r=>(r.a===t.from&&r.b===t.to)||(r.b===t.from&&r.a===t.to));if(!r||p.cityId!==t.from||t.total!==r.turns||!Number.isInteger(t.remaining)||t.remaining<1||t.remaining>t.total)fail();}
 for(const key of ['private','group'])for(const k of ['money','food'])if(!num(s.assets[key]?.[k]))fail();
 for(const id of cityIds)for(const k of ['money','food','troops'])if(!num(s.assets.public?.[id]?.[k]))fail();
 for(const [id,i]of Object.entries(s.intel)){if(!Object.hasOwn(cities,id)||i.cityId!==id||!num(i.obtainedTick)||i.obtainedTick>s.tick||i.source!=='親自抵達／在地見聞'||i.confidence!=='確定（取得時）'||['money','food','troops'].some(k=>!num(i[k])))fail();}
 for(const l of s.logs)if(!num(l.tick)||l.tick>s.tick||typeof l.message!=='string'||l.message.length>300)fail();
 return structuredClone(s);
}
