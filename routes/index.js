module.exports = (app, router) => {
    // const contactRoutes = require("./api/contacts")(app);
    const notesRoutes = require("./api/notes")(app);

    // app.use("/contacts", contactRoutes);
    router.route("/notes", notesRoutes);

    return router
}
