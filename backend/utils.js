// backend/utils.js
const { spawn } = require("child_process");

function runPythonScript(script, args = []) {
  return new Promise((resolve, reject) => {
    let output = "";
    const python = spawn("python", [script, ...args]);
    python.stdout.on("data", (data) => {
      output += data.toString();
    });
    python.stderr.on("data", (err) => reject(err.toString()));
    python.on("close", (code) => {
      code !== 0 ? reject("Python script exited with an error.") : resolve(output.trim());
    });
  });
}

// Only used by "retrieve_month" to convert the Python dict string to a JS object
function parsePythonDict(dictString) {
  const jsonString = dictString.replace(/'/g, '"');
  const parsedObject = JSON.parse(jsonString);
  const result = {};
  for (const [key, sentiment] of Object.entries(parsedObject)) {
    result[parseInt(key, 10)] = sentiment;
  }
  return result;
}

module.exports = {
  runPythonScript,
  parsePythonDict,
};
