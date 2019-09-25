const router = require("express").Router();
const contactRoutes = require("./contacts");
const noteRoutes = require("./notes");
const authenticationRoutes = require("./authentication");

router.use("/authentication", authenticationRoutes);
router.use("/contacts", contactRoutes);
router.use("/notes", noteRoutes);


module.exports = router;
