const router = require("express").Router();
const usersController = require("../../controllers/usersController");


router
    .route("/:username")
    .get(usersController.findByUsername)

module.exports = router;