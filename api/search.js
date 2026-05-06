export default async function handler(req, res) {
  const q = req.query.q;

  if (!q) {
    return res.status(400).json({ error: "Missing query" });
  }

  const response = await fetch(
    `https://api.duckduckgo.com/?q=${encodeURIComponent(q)}&format=json`
  );

  const data = await response.json();

  res.status(200).json(data);
}
