import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';


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

const buildPath = path.join(__dirname, "../frontend/build");
app.use(express.static(buildPath));

// Support React Router for all frontend routes
// Root route
app.get("/", (req, res) => {
  // Check if frontend exists; if not, show a friendly backend message
  const indexPath = path.join(buildPath, "index.html");
  res.sendFile(indexPath, (err) => {
    if (err) {
      res.send("🔥 Backend is live — frontend coming soon!");
    }
  }); HEAD
});

// ---------- Start server ----------
// Catch-all for unknown routes
app.use((req, res) => {
  res.status(404).send("⚡ Oops! Page not found, but backend is running.");
});

app.listen(3000, () => {
  console.log("🔥 Server running on port 3000");
});



// ---------- Start server ----------
// Catch-all for unknown routes
app.use((req, res) => {
  res.status(404).send("⚡ Oops! Page not found, but backend is running.");
});

app.listen(3000, () => {
  console.log("🔥 Server running on port 3000");
});
