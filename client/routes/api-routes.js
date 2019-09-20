const jwt = require("jsonwebtoken");
const User = require("../models/User");
const authWare = require("../middleware/authware");

module.exports = function(app) {
    app.get("/api/signup", function(req, res) {
        User.create(req.body).then(function(res) {
            res.json({ message: "user created"})
        })
    })
}