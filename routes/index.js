const router = require("express").Router();
const apiRoutes = require("./api");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const authWare = require("../");

router.post("/api/signup", function(req, res) {
  User.create(req.body)
    .then(function(result) {
      res.json({ message: "user created" });
    })
    .catch(function(err) {
      res.status(500).json({ error: err.message });
    });
});

router.post("/api/authenticate", function(req, res) {
  const { username, password } = req.body;
  User.findOne({ username: username }).then(function(dbUser) {
    if (!dbUser)
      return res
        .status(401)
        .json({ message: "Username or password incorrect" });
    if (dbUser.comparePassword(password)) {
      const token = jwt.sign(
        {
          data: dbUser._id
        },
        "supersecret"
      );
      res.json({
        id: dbUser._id,
        username: dbUser.username,
        token: token
      });
    } else {
      res.status(401).json({ message: "Username or password incorrect" });
    }
  });
});

router.get("/api/protected", authWare, function(req, res) {
    const user = req.user;
    res.json({ message: user.username + ", is authenticated!" });
});

router.get("/api/public", function(req, res) {
    res.json({ message: "You have access to all pages!" });
});

router.get("api/public", function(req, res) {
    res.json({ message: "public pages only" });
});

router.get("/api/me", authWare, function (req, res) {
    User.findById(req.user._id).then(dbUser => {
        res.json(dbUser);
    })
});

    // app.use("/contacts", contactRoutes);
    router.route("/notes", notesRoutes);

    return router
}
