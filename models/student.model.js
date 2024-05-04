const {DataTypes}=require('sequelize');
const db=require("../db/index");

const Student=db.pgConn.define("Student",{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    name:{
        type:DataTypes.STRING
    },
    age:{
        type:DataTypes.INTEGER
    },
    grade:{
        type:DataTypes.STRING,
    },
    parent_contact:{
        type:DataTypes.INTEGER
    },
    student_code:{
        type:DataTypes.STRING
    },
    status:{
        type:DataTypes.ENUM("ACTIVE", "INACTIVE"),
        allowNull:false
    }
})
module.exports=Student