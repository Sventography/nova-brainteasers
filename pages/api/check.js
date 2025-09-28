const pool = require('../../data/brainteasers.json');

function norm(s=''){
  return String(s).toLowerCase().normalize('NFKD')
    .replace(/[^a-z0-9 ]+/g,'').replace(/\b(the|a|an)\b/g,'')
    .replace(/\s+/g,'').trim();
}

export default function handler(req,res){
  res.setHeader('Access-Control-Allow-Origin','*');
  if(req.method!=='POST') return res.status(405).json({error:'Use POST'});
  try {
    const {id,answer} = req.body;
    const item = pool.find(x=>x.id===id);
    if(!item) return res.status(404).json({error:'Not found'});
    const correct = norm(answer)===norm(item.answer);
    res.status(200).json({correct,acceptedAnswer:item.answer});
  } catch {
    res.status(500).json({error:'Server error'});
  }
}
