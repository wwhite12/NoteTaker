const jwt = require("jsonwebtoken");
const User = require("../models/User");

function authWare (req, res, next) {
    try {
        const { authorization } = req.headers;
        if(!authorization) throw new Error();
        const token = authorization.replace("Bearer", "");
        const decoded = jwt.verify(token, "supersecret");
        const userId = decoded.data;
        User.findById(userId).then(function(dbUser) {
            req.user = dbUser;
            next();
        })
    } catch (err) {
        res.status(401).json({ message: "Unauthorized Request"} );
    }
};

module.exports = function(app) {
    app.get("/api/signup", function(req, res) {
        User.create(req.body).then(function(res) {
            res.json({ message: "user created"})
        })
    })
}