// backend/retrieve.js
const express = require("express");
const { runPythonScript } = require("../utils");

const router = express.Router();
const PYTHON_GET = "backend/py-endpoints/retrieve.py";

router.get("/", async (req, res) => {
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

module.exports = router;
