const router = require("express").Router();
const { registerController } = require("../controllers/users.controller");

router.post("/register", registerController);

module.exports = router