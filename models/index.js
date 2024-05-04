const User = require("../models/users.model")
const Course = require("./courses.model")
const Student = require("./student.model")
const Teacher = require("./teacher.model")

Teacher.belongsTo(User,{
    foreignKey:{
        name:"UserId"
    }
});

Student.belongsTo(User,{
    foreignKey:{
        name:"UserId"
    }
});


Course.belongsTo(Teacher, { foreignKey: 'TeacherId' });
Teacher.hasMany(Course, { foreignKey: 'TeacherId' });



module.exports = {User,Student,Teacher,Course};