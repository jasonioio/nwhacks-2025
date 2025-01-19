// backend/retrieve_month.js
const express = require("express");
const { runPythonScript, parsePythonDict } = require("../utils");

const router = express.Router();
const PYTHON_GET_MONTH = "backend/py-endpoints/retrieve_month.py";

router.get("/", async (req, res) => {
  const { year, month } = req.query;
  if (!year || !month) {
    return res.status(400).json({ error: "Missing year or month parameter" });
  }
  try {
    const rawString = await runPythonScript(PYTHON_GET_MONTH, [year, month]);
    const entries = parsePythonDict(rawString);
    res.json({ entries });
  } catch {
    res.status(500).json({ error: "Python script failed" });
  }
});

module.exports = router;
