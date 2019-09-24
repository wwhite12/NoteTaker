const router = require("express").Router();
const contactRoutes = require("./contacts");
const notesRoutes = require("./notes");



router.use("/contacts", contactRoutes);
router.use("/notes", notesRoutes);


module.exports = router;
