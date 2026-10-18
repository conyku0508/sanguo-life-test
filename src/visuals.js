// 視覺定位與遊戲世界分離；示例插畫不代表正式地理與勢力邊界。
export const illustration = {
 world:'assets/illustrations/world-map.png',
 female:'assets/illustrations/female-scene.png',
 portraits:'assets/illustrations/portrait-atlas.png',
};
export const mapPoints={luoyang:{x:24,y:26},chenliu:{x:78,y:40},yingchuan:{x:30,y:60},runan:{x:77,y:84}};
const paths={
 map:'M3 19 8 5l5 8 4-10 6 16H3Zm5-7 3 7m6-10 3 10M1 22c5-3 7 2 12-1s7-2 10-1',
 person:'M8 6a4 4 0 1 0 8 0 4 4 0 0 0-8 0ZM3 23l2-9 7-3 7 3 2 9M7 14l5 6 5-6M12 20v3',
 self:'M8 3h8l3 7-3 3 4 10H4l4-10-3-3 3-7Zm1 3 3 5 3-5M8 13l4 5 4-5M12 18v5',
 scroll:'M6 2h13v19H5V6m1-4a2 2 0 0 0-2 2v2h4M8 8h8M8 12h8M8 16h6m5 5h3V5h-3',
 chest:'M2 8 6 3h12l4 5v13H2V8Zm0 0h20M7 3v5m10-5v5M2 13h20m-12-2h4v5h-4z',
 coin:'M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm-3 7h6v6H9z',
 grain:'m5 22 12-20M9 16c-5 0-6-3-6-5 4 0 7 1 6 5Zm3-5C7 11 6 8 7 5c3 1 6 3 5 6Zm3-5c-2-4 0-6 2-6 1 3 1 5-2 6Zm-4 8c2-4 5-5 8-3-1 3-4 5-8 3Zm-4 6c2-4 6-4 9-2-2 3-5 4-9 2',
 gate:'M3 10h18v12H3V10Zm5 12v-6a4 4 0 0 1 8 0v6M1 10l11-5 11 5M7 6V3h10v3M5 3l7-2 7 2',
 horse:'m3 19 2-9 8-2 1-6 6 4 1 7-4 1-2-2-2 6 3 4m-10-6-2 6m4-5 1 5M2 10l-1-4m6 4 4 6h5',
 next:'M5 4h12v16H5zM9 8l5 4-5 4M19 4h3v16h-3',
 back:'M10 4 2 12l8 8M2 12h12a7 7 0 0 1 7 7',
 arrow:'M4 12h16m-6-6 6 6-6 6',
 flag:'M5 23V2m0 1c7-4 8 5 16 1v12c-7 4-9-5-16-1',
 close:'m5 5 14 14M5 19 19 5',
};
export function icon(name,cls=''){return `<svg class="icon ${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="${paths[name]??paths.scroll}"/></svg>`;}
export function actorClass(person){return person.id==='player'?(person.gender==='female'?'actor-female':'actor-male'):(person.id==='npc-1'?'actor-shen':'actor-male');}
export function avatar(person){return `<span class="avatar ${actorClass(person)}" aria-hidden="true"></span>`;}
