const router = require("express").Router();
const contactsRoutes = require("./contacts");
const notesRoutes = require("./notes");
const usersRoutes = require("./users");
const authenticationRoutes = require("./authentication");


router.use("/contacts", contactsRoutes);
router.use("/notes", notesRoutes);
router.use("/users", usersRoutes);
router.use("/authentication", authenticationRoutes);




module.exports = router;
