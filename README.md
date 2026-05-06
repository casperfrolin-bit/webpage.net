<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>DuckDuckGo Search</title>

  <style>
    body {
      font-family: Arial, sans-serif;
      background: #111;
      color: #fff;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 40px;
    }

    h1 {
      margin-bottom: 20px;
    }

    input {
      width: 300px;
      padding: 10px;
      border-radius: 8px;
      border: none;
      outline: none;
      font-size: 16px;
    }

    button {
      padding: 10px 20px;
      margin-left: 10px;
      border-radius: 8px;
      border: none;
      cursor: pointer;
      background: #4CAF50;
      color: white;
      font-size: 16px;
    }

    .result {
      margin-top: 30px;
      max-width: 600px;
      width: 100%;
    }

    .card {
      background: #1e1e1e;
      padding: 15px;
      margin-bottom: 15px;
      border-radius: 10px;
    }

    a {
      color: #4CAF50;
      text-decoration: none;
    }

    img {
      max-width: 100%;
      border-radius: 8px;
      margin-top: 10px;
    }
  </style>
</head>
<body>

  <h1>🦆 DuckDuckGo Search</h1>

  <div>
    <input id="searchInput" placeholder="Search anything..." />
    <button onclick="search()">Search</button>
  </div>

  <div id="results" class="result"></div>

  <script>
    async function search() {
      const query = document.getElementById("searchInput").value;
      const resultsDiv = document.getElementById("results");

      resultsDiv.innerHTML = "Loading...";

      try {
        const res = await fetch(
          `https://api.duckduckgo.com/?q=${encodeURIComponent(query)}&format=json`
        );

        const data = await res.json();

        let html = "";

        if (data.Heading) {
          html += `
            <div class="card">
              <h2>${data.Heading}</h2>
              <p>${data.Abstract || "No description available"}</p>
              ${data.Image ? `<img src="https://duckduckgo.com${data.Image}" />` : ""}
            </div>
          `;
        }

        if (data.RelatedTopics && data.RelatedTopics.length > 0) {
          data.RelatedTopics.forEach(item => {
            if (item.Text && item.FirstURL) {
              html += `
                <div class="card">
                  <p>${item.Text}</p>
                  <a href="${item.FirstURL}" target="_blank">Open link</a>
                </div>
              `;
            }
          });
        }

        if (!html) {
          html = "<p>No results found</p>";
        }

        resultsDiv.innerHTML = html;

      } catch (err) {
        resultsDiv.innerHTML = "Error fetching data";
      }
    }
  </script>

</body>
</html>
