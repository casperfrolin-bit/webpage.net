# 🦆 DuckDuckGo Proxy Search (GitHub + Vercel)

En söksida som använder DuckDuckGo via en proxy → döljer användarens IP.

---

## 📁 Struktur

project/
│── index.html
│── api/
│   └── search.js
│── package.json

---

## 📄 index.html

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Search</title>
  <style>
    body { font-family: Arial; background:#111; color:#fff; text-align:center; padding:40px; }
    input { padding:10px; width:300px; border-radius:8px; border:none; }
    button { padding:10px; border:none; border-radius:8px; cursor:pointer; }
    .card { background:#222; margin:10px; padding:15px; border-radius:10px; }
  </style>
</head>
<body>

<h1>🦆 Search</h1>

<input id="q" placeholder="Search..." />
<button onclick="search()">Go</button>

<div id="results"></div>

<script>
async function search() {
  const q = document.getElementById("q").value;
  const resDiv = document.getElementById("results");

  resDiv.innerHTML = "Loading...";

  const res = await fetch(`/api/search?q=${encodeURIComponent(q)}`);
  const data = await res.json();

  let html = "";

  if (data.Heading) {
    html += `<div class="card">
      <h2>${data.Heading}</h2>
      <p>${data.Abstract}</p>
    </div>`;
  }

  (data.RelatedTopics || []).forEach(item => {
    if (item.Text && item.FirstURL) {
      html += `<div class="card">
        <p>${item.Text}</p>
        <a href="${item.FirstURL}" target="_blank">Open</a>
      </div>`;
    }
  });

  resDiv.innerHTML = html || "No results";
}
</script>

</body>
</html>

---

## 📄 api/search.js

export default async function handler(req, res) {
  const q = req.query.q;

  if (!q) {
    return res.status(400).json({ error: "Missing query" });
  }

  try {
    const response = await fetch(
      `https://api.duckduckgo.com/?q=${encodeURIComponent(q)}&format=json`
    );

    const data = await response.json();

    res.status(200).json(data);

  } catch (e) {
    res.status(500).json({ error: "Failed" });
  }
}

---

## 📄 package.json

{
  "name": "duckduckgo-proxy",
  "version": "1.0.0",
  "private": true
}

---

## 🚀 Deploy

1. Skapa repo på GitHub  
2. Ladda upp alla filer  
3. Gå till Vercel  
4. Importera repo  
5. Deploy  

---

## 🔗 Klar!

Din sida:
https://your-app.vercel.app

---

## 🎯 Resultat

User → Vercel (proxy IP) → DuckDuckGo

✔ Användarens IP döljs  
✔ Funkar globalt  
✔ Gratis setup  

---

## ⚠️ Notis

- Detta är inte anonymitet som VPN/Tor
- Men fungerar som proxy för API requests

---
