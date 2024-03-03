const express= require("express");
const User = require("./models/user.model");
const app=express();
const bcrypt=require("bcryptjs");

require("dotenv").config();

PORT=process.env.PORT || 4000


app.use(express.json());







require("./config/database").dbConnect();

async function init(){

    try{
        let user= await User.findOne({userId: "admin"});

        if(user){
        console.log("Admin is already present");
        return 
        }
    }
    catch(err){
        console.log("Error while reading the data",err);
    }
    

    try{
        user = await User.create({
            name:"Nitin",
            userId:"admin",
            email:"nit8948@gmail.com",
            userType:"ADMIN",
            password: bcrypt.hashSync("Welcome1",8)
        })
        console.log("Admin created ",user);
    }
    catch(error){
        console.log("Error while creating admin");
    }
}

init();

const path=require("./routers/auth.route");

app.use("/ecomm/api/v1",path);

app.listen(PORT,()=>{
    console.log(`Server is running at Port no : ${PORT}`)
})