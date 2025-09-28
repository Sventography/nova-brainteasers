const pool = require('../data/brainteasers.json');

function norm(s=''){
  return String(s).toLowerCase().normalize('NFKD')
    .replace(/[^a-z0-9 ]+/g,'').replace(/\b(the|a|an)\b/g,'')
    .replace(/\s+/g,'').trim();
}

module.exports = (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'content-type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Use POST' });

  let body = '';
  req.on('data', c => body += c);
  req.on('end', () => {
    try {
      const { id, answer } = JSON.parse(body || '{}');
      if (!id || typeof answer !== 'string') return res.status(400).json({ error: 'Missing id or answer' });
      const item = pool.find(x => x.id === id);
      if (!item) return res.status(404).json({ error: 'Not found' });
      const correct = norm(answer) === norm(item.answer);
      res.status(200).json({ correct, acceptedAnswer: item.answer });
    } catch {
      res.status(500).json({ error: 'Server error' });
    }
  });
};
