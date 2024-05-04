const { Course, Teacher } = require("../models/index");
const { message } = require("../validators/auth.validators");
//const { message } = require("../validators/auth.validators");
const { Op } = require('sequelize');



const createteacherController = async (req, res) => {
    try {
        const { firstName, lastName, middleName, address, pinCode, specialization, email, phone, teacherCode, userId } = req.body;

        let existingTeacherEmail = await Teacher.findOne({
            where: {
                email: email
            }
        })
        if (existingTeacherEmail) {
            return res.status(400).json('Teacher Email is already exists');
        }
        let existingTeacherCode = await Teacher.findOne({
            where: {
                teacherCode: teacherCode
            }
        })
        if (existingTeacherCode) {
            return res.status(400).json('Teacher Code is already exists');
        }
        let existingTeacherPhone = await Teacher.findOne({
            where: {
                phone: phone
            }
        })
        if (existingTeacherPhone) {
            return res.status(400).json('Phone is already exists');
        }
        const newteacher = new Teacher({
            firstName,
            lastName,
            middleName,
            address,
            pinCode,
            specialization,
            email,
            phone,
            status: "ACTIVE",
            teacherCode, UserId: userId
        })
        res.status(201).json({ message: "teacher create Successfully", data: newteacher });
        await newteacher.save();


    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });

    }

}

const getTeacherController = async (req, res) => {
    try {
        const activeTeachers = await Teacher.findAll({ where: { status: "ACTIVE" } })
        res.status(200).json(activeTeachers);

    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server Error' })

    }
}

const getOneTeacherbyId = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id || isNaN(id)) {
            return res.status(400).json({ message: "TeacherId is not valid" });
        }
        const teacher = await Teacher.findByPk(id, { include: [{ model: Course, attributes: ["name", "schedule"] }] });
        if (!teacher) { return res.status(404).json({ message: 'no data found for teacher with given teacherId' }); }

        const courses = teacher.Courses.map(course => ({
            name: course.name,
            schedule: course.schedule
        }));

        let responseObject = {
            id: teacher.id || null,
            specialization: teacher.specialization || null,
            teacherCode: teacher.teacherCode || null,
            firstName: teacher.firstName || null,
            middleName: teacher.middleName || null,
            lastName: teacher.lastName || null,
            userId: teacher.UserId || null,
            courses: courses
        }
        return res.status(200).json({ message: "Teacher Details found successfully", data: responseObject });

    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server Error' });

    }

}

const getActiveInactive = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id || isNaN(id)) {
            return res.status(400).json({ message: "id must be a valid number" });
        }

        let findteacher = await Teacher.findByPk(id);
        if (!findteacher) {
            return res.status(400).json({ message: "Teacher Id is not Valid" });
        }

        var status = findteacher.status;
        if (status === "ACTIVE") {
            findteacher.status = "INACTIVE";
        } else if (status === "INACTIVE") {
            findteacher.status = "ACTIVE";
        } else {
            console.log("Invalid status");

        }

        findteacher.status = status === "ACTIVE" ? "INACTIVE" : (status === "INACTIVE" ? "ACTIVE" : findteacher.status);
        await findteacher.save();
        let responseObject = {
            id: findteacher.id || null,
            specialization: findteacher.specialization || null,
            teacherCode: findteacher.teacherCode || null,
            firstName: findteacher.firstName || null,
            middleName: findteacher.middleName || null,
            lastName: findteacher.lastName || null,
            userId: findteacher.UserId || null,
            status: findteacher.status || null
        }

        return res.status(200).json({ message: `Teacher ${findteacher.status} Successfully`, data: responseObject });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}


const getUpdateTeacher = async (req, res) => {
    try {
        const { id } = req.params;
        const { firstName, middleName, lastName, address, pinCode, specialization, status, email } = req.body;
        if (!id || isNaN(id))
            return res.status(400).json({ message: "TeacherId must be valid number" });
        const existingTeacher = await Teacher.findByPk(id);
        if (!existingTeacher) {
            return res.status(404).json({ message: "No data found with this id" });
        }
        existingTeacher.firstName = firstName || existingTeacher.firstName;
        existingTeacher.lastName = lastName || existingTeacher.lastName;
        existingTeacher.middleName = middleName || existingTeacher.middleName;
        existingTeacher.address = address || existingTeacher.address;
        existingTeacher.pinCode = pinCode || existingTeacher.pinCode;
        existingTeacher.specialization = specialization || existingTeacher.specialization;
        existingTeacher.status = status || existingTeacher.status;
        existingTeacher.email = email || existingTeacher.email;


        await existingTeacher.save();
        return res.status(200).json({ message: "Teacher Updated Successfully" })

    }


    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });

    }
}

const getTeachersByUserId = async (req, res) => {
    try {
        const { UserId } = req.params;
        // if (!UserId || isNaN(UserId)) {
        //     return res.status(400).json({ message: "UserId must be a valid number" });
        // }

        const getTeachersByUserid = await Teacher.findAll({
            where: { UserId: UserId }
        });
        if (!getTeachersByUserid) {
            return res.status(404).json({ message: "No teacher's data found with this UserId" });

        }

        return res.status(200).json({ message: ' teachers fetched successFully by userId', data: getTeachersByUserid })

    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });

    }
}

const getTeacherbySearch = async (req, res) => {
    try {
        const { query, pageNumber = 1, perPage = 10 } = req.query;
        let whereClause;
        if (query) {
            whereClause = {
                [Op.or]: [
                    { teacherCode: { [Op.iRegexp]: query || '' } },
                ],
            };
        }
        else {
            whereClause = {}
        }
        const order = query ? [['teacherCode', 'ASC']] : [['teacherCode', 'DESC']];;

        const result = await Teacher.findAll({
            where: whereClause,
            offset: Math.max(0, (pageNumber - 1) * perPage) || 0,
            limit: perPage || 10,
            order: order,
            include: [{ model: Course, attributes: ['name', 'schedule', 'location'] }]

        });
        const resultCount = await Teacher.count({ where: whereClause });
        let responseObject = result.map((val) => {
            return {
                Id: val.id || null,
                FirstName: val.firstName || null,
                LastName: val.lastName || null,
                MiddleName: val.middleName || null,
                Address: val.address || null,
                PinCode: val.pinCode || null,
                Specialization: val.specialization || null,
                Status: val.status || null,
                Email: val.email || null,
                Phone: val.phone || null,

            }
        })
        return res.status(200).json({ message: "successfully fetched Teacher Details", count: resultCount, data: responseObject });


    }
    catch (error) {
        console.log(error);
        return res.status(200).json({ message: "Server Error" });

    }
}
const deleteTeacherbyId=async(req,res)=>{
    try{
        const{id}=req.params;
        const teacherDelete=await Teacher.findByPk(id);
        if(!teacherDelete){
            return res.status(400).json({message:"Id is not present"});

        }
        await teacherDelete.destroy();
        res.status(200).json({message:"Teacher Delete Successfully"});


    }
    catch(error){
        console.log(error);
        res.status(500).json({message:"Internal Server Error"});

    }
}


module.exports = { createteacherController, getTeacherController, getOneTeacherbyId, getActiveInactive, getUpdateTeacher, getTeachersByUserId, getTeacherbySearch ,deleteTeacherbyId};