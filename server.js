require("dotenv").config();
require("./db").connectToPostgres();
require("./models/index");
const app = require("./app");

const http=require("http")


app.listen(process.env.PORT,()=>{
    console.log(`app running at port ${process.env.PORT}`);
});