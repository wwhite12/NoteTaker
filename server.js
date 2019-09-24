const express = require("express");
const app = express();
const router = express.Router();

const path = require("path");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

require("./routes/api/notes")(app);

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/app_db", { useNewUrlParser: true });

app.listen(PORT, () => {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});
