const router = require("express").Router();
const { createteacherController, getTeacherController, getOneTeacherbyId, getActiveInactive, getUpdateTeacher, getTeachersByUserId, getTeacherbySearch, deleteTeacherbyId } = require("../controllers/teacher.controller");


router.post("/createTeacher", createteacherController);
router.get("/getTeacher", getTeacherController);
router.get("/getOneTeacher/:id", getOneTeacherbyId)
router.patch("/getActiveInactive/:id",getActiveInactive);
router.patch("/updateTeacher/:id",getUpdateTeacher);
router.get("/getTeacherbyUserId/:UserId",getTeachersByUserId,);
router.get("/getTeacherBySearch",getTeacherbySearch);
router.delete("/deleteTeacher/:id",deleteTeacherbyId);



module.exports = router