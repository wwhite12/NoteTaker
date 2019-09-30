const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "../", process.env.GOOGLE_APPLICATION_CREDENTIALS);
fs.writeFileSync(filePath, process.env.GCP_CREDS);