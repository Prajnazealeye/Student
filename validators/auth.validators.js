const joi = require('joi');

const registerSchema = joi.object({
    username: joi.string().min(3).max(30).required(),
    password: joi.string()
        .min(8)
        .max(15)
        .required()
        .messages({
            'string.min': 'Password must be at least 8 characters long',
            'string.max': 'Password cannot be longer than 15 characters',
            'string.pattern.base': 'Password must contain at least one special character'
        }),

    email: joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
        .required()
        .messages({
            'string.email': 'Invalid email format',
            'string.empty': 'Email is required',
            'string.email': 'Email must have at least 2 domain segments and be one of .com or .net'
        }),

    role: joi.string()
        .valid('Teacher', 'Student')
        .required()
        .messages({
            'any.only': 'Role must be either "teacher" or "student"',
            'string.empty': 'Role is required'
        })



});

module.exports = registerSchema