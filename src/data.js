// 所有地點配置、路線、數值皆為未經史料核對的原型示例。
export const RULES = {baseAbility:40, points:20, abilityMax:60, startAge:20, startTick:0, startYear:184};
export const abilities=['統率','武勇','智略','政務','交涉'];
export const origins={farmer:{name:'農家',money:100,food:80},scholar:{name:'寒門士子',money:140,food:50},trader:{name:'行商之家',money:220,food:40}};
export const cities={yingchuan:{id:'yingchuan',name:'潁川',x:50,y:54},chenliu:{id:'chenliu',name:'陳留',x:75,y:25},luoyang:{id:'luoyang',name:'洛陽',x:23,y:23},runan:{id:'runan',name:'汝南',x:70,y:83}};
export const routes=[{a:'yingchuan',b:'chenliu',turns:2,money:12,food:8},{a:'yingchuan',b:'luoyang',turns:3,money:18,food:12},{a:'yingchuan',b:'runan',turns:2,money:10,food:8},{a:'chenliu',b:'luoyang',turns:3,money:20,food:12}];
export const cityIds=Object.keys(cities);
