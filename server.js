const express = require("express");
const app = express();
const router = express.Router();

const path = require("path");
const mongoose = require("mongoose");

const routes = require("./routes/index");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

require("./routes/api/notes")(app);

//mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/app_db", { useNewUrlParser: true });
mongoose.connect("mongodb://localhost/authExample", { useNewUrlParser: true });

app.listen(PORT, () => {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});
