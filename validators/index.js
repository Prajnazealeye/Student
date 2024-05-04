const registerSchema = require('./auth.validators');


const validator = (schema, payload) => {
    return schema.validate(payload, { abortEarly: false });
};

module.exports = { validator, registerSchema }