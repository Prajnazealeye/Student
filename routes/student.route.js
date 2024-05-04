const { createStudentController, getStudentController, getOneStudentbyId, getActiveInactive, getUpdateStudent, getStudentsByUserId, getStudentbySearch, deleteStudentbyId } = require("../controllers/student.controller");

const router = require("express").Router();

router.post("/createStudent",createStudentController);
router.get("/getStudent",getStudentController);
router.get("/getOneStudent/:id",getOneStudentbyId);
router.patch("/getActiveInactive/:id",getActiveInactive);
router.patch("/updateStudent/:id",getUpdateStudent);
router.get("/getStudentByUserId/:userId",getStudentsByUserId);
router.get("/getStudentBySearch",getStudentbySearch);
router.delete("deleteStudent/:id",deleteStudentbyId);



module.exports = router