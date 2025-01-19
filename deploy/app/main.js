const express = require("express");
const cors = require("cors");
const path = require("path");
const os = require("os");

const analyzeRoute = require("./js-endpoints/analyze");
const retrieveRoute = require("./js-endpoints/retrieve");
const retrieveMonthRoute = require("./js-endpoints/retrieve_month");
const lifestyleRoute = require("./js-endpoints/lifestyle");

const app = express();
const PORT = 3001;
const HOST = "0.0.0.0";

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "../dist")));

// Mount each route under its respective path
app.use("/analyze", analyzeRoute);
app.use("/retrieve", retrieveRoute);
app.use("/retrieve_month", retrieveMonthRoute);
app.use("/lifestyle", lifestyleRoute);

// Catch-all for your built frontend
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../dist", "index.html"));
});

app.listen(PORT, HOST, () => {
  console.log(`Server running at http://${getLocalIPAddress()}:${PORT}`);
});

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
