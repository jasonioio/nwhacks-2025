// backend/lifestyle.js
const express = require("express");
const { runPythonScript } = require("../utils");

const router = express.Router();
const PYTHON_GET_LIFESTYLE = "backend/py-endpoints/lifestyle.py";

router.get("/", async (req, res) => {
  try {
    const advice = await runPythonScript(PYTHON_GET_LIFESTYLE, []);
    res.json({ advice });
  } catch {
    res.status(500).json({ error: "Python script failed" });
  }
});

module.exports = router;
