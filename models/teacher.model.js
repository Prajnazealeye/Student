const { DataTypes } = require('sequelize');
const db = require('../db/index');

const Teacher = db.pgConn.define("Teachers", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false

    },
    middleName: {
        type: DataTypes.STRING,
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false

    },
    address:{
        type:DataTypes.STRING
    },
    pinCode:{
        type:DataTypes.STRING,
        allowNull:false,

    },
    specialization: {
        type: DataTypes.STRING,
        allowNull:false

    },
    status: {
        type: DataTypes.ENUM("ACTIVE", "INACTIVE"),
        allowNull:false

    },
    email: {
        type: DataTypes.STRING,
        allowNull:false
    },
    phone: {
        type: DataTypes.INTEGER,
        allowNull:false
    },
    teacherCode: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

module.exports = Teacher;