import {forecastRealm,assignOfficer,setPolicy,policies,duties,REALM_RULES} from './realm.js?v=realm2';
import {cities} from './data.js?v=realm2';
import {date} from './world.js?v=realm2';
import {icon,avatar} from './visuals.js?v=realm2';
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const signed=n=>(n>=0?'＋':'')+n;
export function renderRealmUI(s,host,pane,api){
 host.dataset.realmView=pane;const r=s.realm;if(!r){host.innerHTML='<div class="panel lacquer"><h2>舊版旅途已保留</h2><p class="legacy-copy">新版改為小勢力之主開局。這份旅途仍可繼續查看、保存與匯出，不會自動改寫成新勢力。</p><button id="realm-start">另建小勢力</button></div>';host.querySelector('#realm-start').onclick=api.start;return;}
 const q=forecastRealm(s),a=s.assets.public[r.seatId];
 host.innerHTML=`<div class="realm-hero"><span class="realm-stamp">小勢力</span><div class="scene-caption"><h2>${esc(r.seatName)}</h2><small>${cities[r.homeCityId].name}近郊 · 原創據點 · 民戶${r.population}人／守備${a.troops}人</small></div></div><div class="realm-board lacquer"><div class="realm-tabs">${[['overview','治政'],['assign','部屬'],['report','旬報']].map(([id,label])=>`<button data-realm-pane="${id}" aria-pressed="${pane===id}">${label}</button>`).join('')}</div><div class="realm-body" id="realm-body"></div></div>`;
 host.querySelectorAll('[data-realm-pane]').forEach(b=>b.onclick=()=>api.pane(b.dataset.realmPane));const body=host.querySelector('#realm-body');
 if(pane==='overview'){
 const age=s.tick-r.foundedTick;
 body.innerHTML=`<div class="realm-measures">${[['治安',r.security],['民心',r.morale],['發展',r.prosperity],['軍備',r.training]].map(([name,n])=>`<div><small>${name}</small><b>${n}</b></div>`).join('')}</div><div class="realm-budget"><div>${icon('coin')}<span>下旬公共錢<b class="${q.net.money<0?'down':''}">${signed(q.net.money)}</b></span></div><div>${icon('grain')}<span>下旬公共糧<b class="${q.net.food<0?'down':''}">${signed(q.net.food)}</b></span></div></div><label class="policy-control">徵收方針<select id="realm-policy">${Object.entries(policies).map(([id,p])=>`<option value="${id}" ${r.policy===id?'selected':''}>${p.name}（錢收${Math.round(p.income*100)}%／民心${signed(p.morale)}）</option>`).join('')}</select></label><p class="realm-weather">${q.weather}${q.raid?' · 治安不足，預計發生劫掠':''}${q.shortfall.food||q.shortfall.money?' · 公共資源將不足':''}</p><button id="realm-goal" class="goal-progress"><b>${r.goalReached?'根基初穩 ✓':'立足目標：根基初穩'}</b><span>${Math.min(age,REALM_RULES.goalTurns)}/${REALM_RULES.goalTurns}旬 · 糧${a.food}/${REALM_RULES.goalFood} · 治安${r.security}/${REALM_RULES.goalSecurity} · 民心${r.morale}/${REALM_RULES.goalMorale}</span></button>`;
 body.querySelector('#realm-policy').onchange=e=>api.change(()=>setPolicy(s,e.target.value));body.querySelector('#realm-goal').onclick=()=>api.goal();
 }
 if(pane==='assign'){
 body.innerHTML=`<p class="realm-help">部屬每人一項差事，持續至更改。下令不耗旬，推進時執行；所有費用走公共帳。</p>${r.officerIds.map(id=>{const n=s.persons[id];return `<div class="officer-row">${avatar(n)}<div><strong>${esc(n.name)}</strong><small>統${n.abilities[0]} · 勇${n.abilities[1]} · 政${n.abilities[3]} · 交${n.abilities[4]}</small><select data-duty="${id}" aria-label="${esc(n.name)}差事">${Object.entries(duties).map(([key,d])=>`<option value="${key}" ${r.assignments[id]===key?'selected':''}>${d.name}｜${d.description}</option>`).join('')}</select></div></div>`;}).join('')}<p class="realm-weather">${q.weather} · 預計錢${signed(q.net.money)}／糧${signed(q.net.food)}</p>`;
 body.querySelectorAll('[data-duty]').forEach(el=>el.onchange=()=>api.change(()=>assignOfficer(s,el.dataset.duty,el.value)));
 }
 if(pane==='report'){
 const report=r.reports.at(-1);body.innerHTML=report?`<div class="report-title"><h3>${date(report.tick)}・結算</h3><small>公共帳，不含私人行囊</small></div><div class="report-totals"><span>錢 ${signed(report.net.money)}</span><span>糧 ${signed(report.net.food)}</span></div><dl class="intel-provenance compact"><div><dt>生產收入</dt><dd>${report.income.money}錢／${report.income.food}糧</dd></div><div><dt>維持／俸用</dt><dd>${report.upkeep.money}錢／${report.upkeep.food}糧</dd></div><div><dt>劫掠損失</dt><dd>${report.losses.money}錢／${report.losses.food}糧</dd></div></dl><div class="report-operations">${report.operations.map(o=>`<p><b>${esc(s.persons[o.personId].name)}・${duties[o.duty].name}</b><small>${esc(o.text)}</small></p>`).join('')}</div><p class="realm-weather">${esc(report.weather)}${report.raid?' · 治安不足，劫掠已扣除。':''}${report.shortfall.food||report.shortfall.money?' · 公共資源不足，民心下降。':''}</p>`:'<div class="empty-state"><h3>尚未進行旬結算</h3><p>先在部屬頁配置差事，查看預計收支，再推進一旬。</p></div>';
 }
}
