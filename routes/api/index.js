const router = require("express").Router();
const contactsRoutes = require("./contacts");
const notesRoutes = require("./notes");
const usersRoutes = require("./users");


router.use("/contacts", contactsRoutes);
router.use("/notes", notesRoutes);
router.use("/users", usersRoutes);


module.exports = router;
