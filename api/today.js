const pool = require('../data/brainteasers.json');
const { dailyPick } = require('../lib/daily');

module.exports = (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 'no-store');
  const items = dailyPick(pool, 5).map(({ id, prompt }) => ({ id, prompt }));
  res.status(200).json({ date: new Date().toISOString().slice(0,10), items });
};
