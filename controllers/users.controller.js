const User = require("../models/users.model");
const { validator, registerSchema } = require("../validators/index")
const registerController = async (req, res) => {
    try {
        const { username, password, email, role } = req.body;


        const validateBody = { username, password, email, role };

        const {error, value} = validator(registerSchema, validateBody);
        if(error){
            return res.status(400).json({error: error.details})
        }

        // const { error } = User.validate(req.body);
        // if (error) {
        //     return res.status(400).json({ message: error.details[0].message });
        // }


        let existingUser = await User.findOne({
            where:
            {
                email: email
            }
        });
        if (existingUser) {
            return res.status(400).json("User already exists");
        }

        const newUser = new User(
            {
                username,
                password,
                email,
                role
            }
        )
        res.status(201).json("User Registered Successfully");
        await newUser.save();



    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });

    }
}



module.exports = { registerController }