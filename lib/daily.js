function mulberry32(a){return function(){var t=a+=0x6D2B79F5;t=Math.imul(t^(t>>>15),t|1);t^=t+Math.imul(t^(t>>>7),t|61);return((t^(t>>>14))>>>0)/4294967296;}}
function dailyPick(arr,count=5,date=new Date()){
  const ymd=Number(date.toISOString().slice(0,10).replace(/-/g,'')); 
  const rand=mulberry32(ymd);
  const chosen=new Set();
  while (chosen.size < Math.min(count, arr.length)) chosen.add(Math.floor(rand()*arr.length));
  return Array.from(chosen).map(i => arr[i]);
}
module.exports = { dailyPick };
