// backend/analyze.js
const express = require("express");
const { runPythonScript } = require("../utils");

const router = express.Router();
const PYTHON_POST = "backend/py-endpoints/analyze.py";

router.post("/", async (req, res) => {
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

module.exports = router;
