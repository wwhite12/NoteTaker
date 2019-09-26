
    // const contactRoutes = require("./api/contacts")(app);
    // const notesRoutes = require("./api/notes")(app);

const router = require("express").Router();
const apiRoutes = require("./api");


// Contact routes

router.use("/api", apiRoutes);

   module.exports = router;

