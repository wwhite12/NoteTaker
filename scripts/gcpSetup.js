const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "../", process.env.GCP_KEY_FILE);
fs.writeFileSync(filePath, process.env.GOOGLE_APPLICATION_CREDENTIALS);