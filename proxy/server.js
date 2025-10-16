const path = require('path');
const { fileURLToPath } = require('url');
const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/webhook-test", async (req, res) => {
  console.log("Data received:", req.body);
  
  try {
    const response = await fetch("https://pushparani.app.n8n.cloud/webhook-test/3dd4bcc0-9cfa-4dc7-b0eb-95db0159b2c2", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body),
    });

    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// serve frontend build
app.use(express.static(path.join(__dirname, "../frontend/build")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/build", "index.html"));
});

app.listen(3000, () => console.log("🔥 Server running on port 3000"));
