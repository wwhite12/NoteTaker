const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const routes = require("./routes");
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/notesImages", express.static("notesImages"));
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}
require("./routes/api/authentication")(app);

require("./routes/ocr/ocr")(app);
app.use(routes);

if (process.env.NODE_ENV === "production") {
  app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "./client/build/index.html"));
  });
}

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/app_db", { useNewUrlParser: true });

app.listen(PORT, () => {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});