const router = require("express").Router();
const apiRoutes = require("./api");
const notesRoutes = require("./api/notes");

module.exports = 


    // app.use("/contacts", contactRoutes);
    router.route("/notes", notesRoutes);

    return router

