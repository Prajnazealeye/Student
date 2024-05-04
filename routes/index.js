const router = require("express").Router()

router.use("/users", require("./register.route"));
router.use("/teachers",require("./teacher.route"));
router.use("/course",require("./course.route"));
router.use("/student",require("./student.route"));

module.exports = router