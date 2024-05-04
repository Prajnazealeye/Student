
const router=require('express').Router();
const {createCourseController,  getAllCourseController, getOneCoursebyId,  UpdateCourse, getCoursebySearch, deleteCourebyId} = require('../controllers/course.controller');


router.post("/createCourse",createCourseController);
router.get("/getAllCourse",getAllCourseController);
router.get("/getCoursebyId/:id",getOneCoursebyId);
router.patch("/UpdateCourse/:id",UpdateCourse);
router.get("/getCourseBySearch",getCoursebySearch);
router.delete("/ddeleteCourseById",deleteCourebyId)

module.exports=router;