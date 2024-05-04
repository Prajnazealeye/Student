const Student = require("../models/student.model");
const { student } = require("../models/student.model");

const { Op } = require('sequelize');



const createStudentController = async (req, res) => {
    try {
        const { name, age, grade, parent_contact, student_code, userId } = req.body;

        let existingStudentCode = await Student.findOne({
            where: {
                student_code: student_code
            }
        })
        if (existingStudentCode) {
            return res.status(400).json('Student Code is already exists');
        }
        let existingStudentPhone = await Student.findOne({
            where: {
                phone: phone
            }
        })
        if (existingStudentPhone) {
            return res.status(400).json('Phone is already exists');
        }
        const newstudent = new Student({
            name,
            age,
            grade, parent_contact,
            student_code,
            status: "ACTIVE",
            UserId: userId
        })
        res.status(201).json({ message: "teacher create Successfully", data: newstudent });
        await newstudent.save();


    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });

    }

}

const getStudentController = async (req, res) => {
    try {
        const activeStudent = await Student.findAll({ where: { status: "ACTIVE" } })
        res.status(200).json(activeStudent);

    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server Error' })

    }
}

const getOneStudentbyId = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id || isNaN(id)) {
            return res.status(400).json({ message: "studentId is not valid" });
        }
        const student = await Student.findByPk(id);
        if (!student) { return res.status(404).json({ message: 'no data found for teacher with given studentId' }); }



        let responseObject = {
            id: student.id || null,
            name:student.name || null,
            age:student.age || null,
            grade:student.grade || null,
            parent_contact:student.parent_contact || null,
            student_code:student.student_code || null,
            status:student.status || null,
            userId:student.UserId || null




        }
        return res.status(200).json({ message: "Student  Details found successfully", data: responseObject });

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

        let findStudent = await Student.findByPk(id);
        if (!findStudent) {
            return res.status(400).json({ message: "Student ID is not Valid" });
        }

        var status = findStudent.status;
        if (status === "ACTIVE") {
            findStudent.status = "INACTIVE";
        } else if (status === "INACTIVE") {
            findStudent.status = "ACTIVE";
        } else {
            console.log("Invalid status");

        }

        findStudent.status = status === "ACTIVE" ? "INACTIVE" : (status === "INACTIVE" ? "ACTIVE" : findStudent.status);
        await findStudent.save();
        let responseObject = {
            id: findStudent.id || null,
            age: findStudent.age || null,
            grade: findStudent.grade || null,
            parent_contact: findStudent.parent_contact || null,
            userId: findStudent.UserId || null,
            status: findStudent.status || null
        }

        return res.status(200).json({ message: `Student ${findStudent.status} Successfully`, data: responseObject });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}


const getUpdateStudent = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, age, grade, parent_contact } = req.body;
        if (!id || isNaN(id))
            return res.status(400).json({ message: "StudentId must be valid number" });
        const existingStudent = await Student.findByPk(id);
        if (!existingStudent) {
            return res.status(404).json({ message: "No data found with this id" });
        }
        existingStudent.name = name || existingStudent.name;
        existingStudent.age = age || existingStudent.age;
        existingStudent.grade = grade || existingStudent.grade;
        existingStudent.parent_contact = parent_contact || existingStudent.parent_contact;




        await existingStudent.save();
        return res.status(200).json({ message: "Student Updated Successfully" })

    }


    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });

    }
}

const getStudentsByUserId = async (req, res) => {
    try {
        const { UserId } = req.params;
        // if (!UserId || isNaN(UserId)) {
        //     return res.status(400).json({ message: "UserId must be a valid number" });
        // }

        const getStudentsByUserId = await Student.findAll({
            where: { UserId: UserId }
        });
        if (!getStudentsByUserId) {
            return res.status(404).json({ message: "No Student's data found with this UserId" });

        }

        return res.status(200).json({ message: ' student fetched successFully by userId', data: getTeachersByUserid })

    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });

    }
}

const getStudentbySearch = async (req, res) => {
    try {
        const { query, pageNumber = 1, perPage = 10 } = req.query;
        let whereClause;
        if (query) {
            whereClause = {
                [Op.or]: [
                    { student_code: { [Op.iRegexp]: query || '' } },
                ],
            };
        }
        else {
            whereClause = {}
        }
        const order = query ? [['student_code', 'ASC']] : [['student_code', 'DESC']];;

        const result = await Student.findAll({
            where: whereClause,
            offset: Math.max(0, (pageNumber - 1) * perPage) || 0,
            limit: perPage || 10,
            order: order,
           

        });
        const resultCount = await Student.count({ where: whereClause });
        let responseObject = result.map((val) => {
            return {
                Id: val.id || null,
                age:val.age || null,
                grade:val.grade || null,
                parent_contact:val.parent_contact || null,

            }
        })
        return res.status(200).json({ message: "successfully fetched Student Details", count: resultCount, data: responseObject });


    }
    catch (error) {
        console.log(error);
        return res.status(200).json({ message: "Server Error" });

    }
}
const deleteStudentbyId = async (req, res) => {
    try {
        const { id } = req.params;
        const studentDelete = await Student.findByPk(id);
        if (!studentDelete) {
            return res.status(400).json({ message: "Id is not present" });

        }
        await studentDelete.destroy();
        res.status(200).json({ message: "Student Delete Successfully" });


    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });

    }
}


module.exports = { createStudentController, getStudentController, getOneStudentbyId, getActiveInactive, deleteStudentbyId,getStudentbySearch,getStudentsByUserId,getUpdateStudent };