const Joi = require('joi');
const joi=require('joi');

const createTeacherValidator=joi.object({
    firstName:joi.string().required(),
    lastName:joi.string().required(),
    middleName:joi.string().required(),
    address:joi.string().required(),
    pinCode:joi.string().required(),
    specialization:joi.string().required(),
    status:joi.enum().required(),
    phone:joi.integer().required(),
    teacherCode:joi.string().required(),
    UserId:joi.string().required()

});


const updateTeacherValidator=joi.object({
    firstName:joi.string().required(),
    lastName:joi.string().required(),
    middleName:joi.string().required(),
    address:joi.string().required(),
    specialization:joi.string().required(),
    status:joi.enum().required()
})
module.exports={createTeacherValidator,updateTeacherValidator};