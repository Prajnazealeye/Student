const Course = require("../models/courses.model");
const { message } = require("../validators/auth.validators");
const { Op } = require('sequelize');



const createCourseController = async (req, res) => {
    try {
        const { name, courseCode, schedule, location, teacherId } = req.body;
        let existingCourseCode = await Course.findOne({
            where: {
                courseCode: courseCode
            }
        })
        if (existingCourseCode) {
            return res.status(400).json({ message: "Course Code already exists" });
        }
        const newCourse = new Course({
            name,
            courseCode,
            schedule,
            location,
            TeacherId: teacherId
        })
        res.status(201).json({ message: "Course Created Successfully" });
        await newCourse.save();

    }
    catch (error) {
        console.log(error);
        return res.status(500).json("Internal Server Error");

    }
}

const getAllCourseController = async (req, res) => {
    try {
        const course = await Course.findAll()
        res.status(200).json(course);

    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server" });

    }
}

const getOneCoursebyId = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id || isNaN(id)) {
            return res.status(400).json({ message: "CourseId is not valid" });
        }
        const course = await Course.findByPk(id);
        if (!course) {
            return res.status(404).json({ message: "Course is not found" });
        };
        let responseobject = {
            id: course.id || null,
            name: course.name || null,
            schedule: course.schedule || null,
            location: course.location || null,
            teacherId: course.TeacherId || null

        }
        return res.status(200).json({ message: "Course details fetched successfully", data: responseobject });

    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });

    }
}
const UpdateCourse = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, schedule, location } = req.body;
        if (!id || isNaN(id))
            return res.status(400).json({ message: "CourseId is invalid" });
        const existingCourse = await Course.findByPk(id);
        if (!existingCourse) {
            return res.status(404).json({ message: "no found any course with this id" });
        }
        existingCourse.name = name || existingCourse.name;
        existingCourse.schedule = schedule || existingCourse.schedule;
        existingCourse.location = location || existingCourse.location;

        await existingCourse.save();
        return res.status(200).json({ message: "Course Updated Successfully" });


    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Errror" });

    }
}

const getCoursebySearch = async (req, res) => {
    try {
        const { query, perPage, pageNumber } = req.query;
        let whereClause;
        if (query) {
            whereClause = {
                [Op.or]: [
                    { courseCode: { [Op.iRegexp]: query || '' } },

                ],
            };
        }
        else {
            whereClause = {}
        }
        const order = query ? [['courseCode', 'ASC']] : [['courseCode', 'DESC']];;

        const result = await Course.findAll({
            where: whereClause,
            offset: Math.max(0, (pageNumber - 1) * perPage) || 0,
            limit: perPage || 10,
            order: order,


        });
        const resultCount = await Course.count({ where: whereClause });
        let responseObject = result.map((val) => {
            return {
                Id: val.id || null,
                Name: val.name || null,
                Location: val.location || null,
                Schedule: val.schedule || null

            }
        })
        return res.status(200).json({ message: "successfully fetched Course Details", count: resultCount, data: responseObject });



    }
    catch (error) {
        console.log(error);
        return res.status(200).json({ message: "Server Error" })

    }
}
const deleteCourebyId=async(req,res)=>{
    const {id}=req.params;
    const deleteCourse=await Course.findByPk(id);
    if(!deleteCourse){
        return res.status(201).json({message:"Course deleted Successfully"});
    }
}


module.exports = { createCourseController, getAllCourseController, getOneCoursebyId, UpdateCourse, getCoursebySearch,deleteCourebyId };

