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


// ---------- API route ----------

app.post("/api/webhook-test", async (req, res) => {
  console.log("Data received:", req.body);
  
  try {
    const response = await fetch("https://pushparani.app.n8n.cloud/webhook-test/3dd4bcc0-9cfa-4dc7-b0eb-95db0159b2c2", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body),
    });

    const data = await response.json();
    return res.json(data);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// ---------- Serve React frontend ----------

const buildPath = path.join(__dirname, "../frontend/build");
app.use(express.static(buildPath));

// Support React Router for all frontend routes

app.get("/", (req, res) => {
  // Check if frontend exists; if not, show a friendly backend message
  const indexPath = path.join(buildPath, "index.html");
  res.sendFile(indexPath, (err) => {
    if (err) {
      // Only send this if headers are not already sent
      if (!res.headersSent) {
       res.send("🔥 Backend is live — frontend coming soon!");
      }  
    }
  }); 
});

// ---------- Start server ----------

const PORT = process.env.PORT || 3000;
app.listen(3000, () => {
  console.log("🔥 Server running on port 3000");
});
