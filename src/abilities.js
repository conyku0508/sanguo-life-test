// 使用者指定的創角區間：端點皆包含；分組抽值後隨機分派能力。
export const ABILITY_BANDS=[[80,90],[70,80],[60,70],[50,60],[50,60]];
export function rollAbilities(random=Math.random){const draw=()=>{const n=random();if(!Number.isFinite(n)||n<0||n>=1)throw Error('亂數來源無效');return n;};const values=ABILITY_BANDS.map(([lo,hi])=>lo+Math.floor(draw()*(hi-lo+1)));for(let i=4;i>0;i--){const j=Math.floor(draw()*(i+1));[values[i],values[j]]=[values[j],values[i]];}return values;}
export function validRolledAbilities(values){if(!Array.isArray(values)||values.length!==5||values.some(n=>!Number.isInteger(n)))return false;const v=values.slice().sort((a,b)=>b-a);return ABILITY_BANDS.every(([lo,hi],i)=>v[i]>=lo&&v[i]<=hi);}
