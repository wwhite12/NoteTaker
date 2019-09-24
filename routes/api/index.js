const router = require("express").Router();
const contactRoutes = require("./contacts");
const noteRoutes = require("./notes");

router.use("/contacts", contactRoutes);
router.use("/notes", noteRoutes);

module.exports = router;
