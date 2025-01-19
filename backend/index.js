const express = require("express");
const cors = require("cors");
const path = require("path");
const os = require("os");
const { spawn } = require("child_process");

const app = express();
const PORT = 3001;
const HOST = "0.0.0.0";
const PYTHON_SCRIPT = "backend/main.py";

app.use(cors());
app.use(express.json());

function getLocalIPAddress() {
  const networks = os.networkInterfaces();
  for (const iface of Object.values(networks)) {
    for (const details of iface) {
      if (details.family === "IPv4" && !details.internal) {
        return details.address;
      }
    }
  }
  return "0.0.0.0";
}

function runPythonAnalysis(date, text) {
  return new Promise((resolve, reject) => {
    const python = spawn("python", [PYTHON_SCRIPT, date, text]);

    python.stderr.on("data", (err) => {
      reject(err.toString());
    });

    python.on("close", (code) => {
      if (code !== 0) {
        reject("Python script exited with an error.");
      } else {
        resolve();
      }
    });
  });
}

// API endpoint
app.post("/analyze", async (req, res) => {
  const { text } = req.body;
  const date = "2022-02-22";

  try {
    await runPythonAnalysis(date, text);
    res.json({ success: true });
  } catch (error) {
    console.error("Error analyzing sentiment:", error);
    res.status(500).json({ error: "Python script failed" });
  }
});

app.use(express.static(path.join(__dirname, "../dist")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../dist", "index.html"));
});

app.listen(PORT, HOST, () => {
  const localIP = getLocalIPAddress();
  console.log(`Server running at http://${localIP}:${PORT}`);
});
