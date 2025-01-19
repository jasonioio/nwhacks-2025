const express = require("express");
const cors = require("cors");
const path = require("path");
const os = require("os");
const { spawn } = require("child_process");

const app = express();
const PORT = 3001;
const HOST = "0.0.0.0";
const PYTHON_POST = "backend/post.py";
const PYTHON_GET = "backend/get.py";
const PYTHON_GET_MONTH = "backend/get_month.py";

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

function runPythonScript(script, args) {
  return new Promise((resolve, reject) => {
    let output = "";
    const python = spawn("python", [script, ...args]);
    python.stdout.on("data", (data) => {
      output += data.toString();
    });
    python.stderr.on("data", (err) => {
      reject(err.toString());
    });
    python.on("close", (code) => {
      code !== 0 ? reject("Python script exited with an error.") : resolve(output.trim());
    });
  });
}

app.post("/analyze", async (req, res) => {
  const { date, text } = req.body;
  if (!date || !text?.trim()) {
    return res.status(400).json({ error: "Missing or invalid date/text" });
  }
  try {
    await runPythonScript(PYTHON_POST, [date, text]);
    res.json({ success: true });
  } catch {
    res.status(500).json({ error: "Python script failed" });
  }
});

app.get("/retrieve", async (req, res) => {
  const { date } = req.query;
  if (!date) {
    return res.status(400).json({ error: "Missing date parameter" });
  }
  try {
    const data = await runPythonScript(PYTHON_GET, [date]);
    res.json({ entry: data });
  } catch {
    res.status(500).json({ error: "Python script failed" });
  }
});

app.get("/retrieve_month", async (req, res) => {
  const { year, month } = req.query;
  if (!year || !month) {
    return res.status(400).json({ error: "Missing year or month parameter" });
  }
  try {
    const data = await runPythonScript(PYTHON_GET_MONTH, [year, month]);
    res.json({ entries: data });
  } catch {
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
