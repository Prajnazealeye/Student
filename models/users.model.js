const { DataTypes } = require('sequelize');
const db = require("../db/index")

const User = db.pgConn.define("Users", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: DataTypes.STRING,
    },
    password: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING
    },
    role: {
        type: DataTypes.ENUM("Teacher", "Student"),
        //allowNull:false
    }
});

module.exports = User;