const express = require("express");
const cors = require("cors");
const { spawn } = require("child_process");

const app = express();
const PORT = 3001;
const HOST = "0.0.0.0"; // Allows access from any device on your network
const PYTHON_SCRIPT = "backend/sentiment_analyser.py";

app.use(cors());
app.use(express.json());

function runPythonAnalysis(text) {
  return new Promise((resolve, reject) => {
    const python = spawn("python", [PYTHON_SCRIPT, text]);
    let output = "";

    python.stdout.on("data", (data) => {
      output += data.toString();
    });

    python.stderr.on("data", (err) => {
      reject(err.toString());
    });

    python.on("close", (code) => {
      code !== 0
        ? reject("Python script exited with an error.")
        : resolve(output.trim());
    });
  });
}

app.post("/analyze", async (req, res) => {
  try {
    const { text } = req.body;
    const sentiment = await runPythonAnalysis(text);
    res.json({ sentiment });
  } catch (error) {
    console.error("Error analyzing sentiment:", error);
    res.status(500).json({ error: "Python script failed" });
  }
});

app.listen(PORT, HOST, () => {
  console.log(`Server running at http://${HOST}:${PORT}`);
});
