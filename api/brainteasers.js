// api/brainteasers.js  (CommonJS so no ESM quirks)
const TEASERS = [
  { q: "What has to be broken before you can use it?", a: "An egg." },
  { q: "I speak without a mouth and hear without ears. What am I?", a: "An echo." },
  { q: "What gets wetter the more it dries?", a: "A towel." },
  { q: "The more you take, the more you leave behind. What are they?", a: "Footsteps." },
  { q: "What has many keys but can’t open a single lock?", a: "A piano." },
];

module.exports = (req, res) => {
  // CORS for your Expo app
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  if (req.method === "OPTIONS") return res.status(200).end();

  const count = Math.min(
    50,
    Math.max(1, parseInt((req.query?.count || req.body?.count || "5"), 10) || 5)
  );
  const shuffled = [...TEASERS].sort(() => Math.random() - 0.5);
  res.status(200).json({ items: shuffled.slice(0, count) });
};
