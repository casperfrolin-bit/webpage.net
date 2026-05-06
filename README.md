# 🧭 Simple Proxy Search Site

Frontend (GitHub Pages) + Backend (Vercel Proxy)

---

## 📁 STRUCTURE

/
│── index.html
│── api/
│   └── search.js

---

# 🌐 index.html (FRONTEND)

```html id="front1"
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Proxy Search</title>
<style>
body { font-family: Arial; background:#111; color:white; text-align:center; padding:40px; }
input { padding:10px; width:300px; border-radius:8px; border:none; }
button { padding:10px; border-radius:8px; border:none; cursor:pointer; }
.card { background:#222; margin:10px auto; padding:15px; width:70%; border-radius:10px; }
a { color:#4CAF50; }
</style>
</head>
<body>

<h1>🔎 Proxy Search</h1>

<input id="q" placeholder="Search..." />
<button onclick="search()">Search</button>

<div id="out"></div>

<script>
async function search() {
  const q = document.getElementById("q").value;
  const out = document.getElementById("out");

  out.innerHTML = "Loading...";

  const res = await fetch("/api/search?q=" + encodeURIComponent(q));
  const data = await res.json();

  let html = "";

  if (data.Heading) {
    html += `<div class="card">
      <h2>${data.Heading}</h2>
      <p>${data.Abstract || ""}</p>
    </div>`;
  }

  (data.RelatedTopics || []).forEach(t => {
    if (t.Text) {
      html += `<div class="card">
        <p>${t.Text}</p>
        <a href="${t.FirstURL}" target="_blank">Open</a>
      </div>`;
    }
  });

  out.innerHTML = html || "No results";
}
</script>

</body>
</html>
