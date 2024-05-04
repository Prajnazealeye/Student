const {DataTypes}=require('sequelize');
const db=require("../db/index");

const Course=db.pgConn.define("Courses",{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    name:{
        type:DataTypes.STRING,
        
    },
    schedule:{
        type:DataTypes.STRING,
    },
    location:{
        type:DataTypes.STRING
    },
    courseCode:{
        type:DataTypes.STRING
    },
    status:{
        type:DataTypes.ENUM("ACTIVE", "INACTIVE")
    }
    
})
module.exports=Course