const User=require("../models/user.model");
const bcrypt=require("bcryptjs");

exports.signup= async (req,res)=>{

    const requestBody=req.body;

    const userObj= {
        name:requestBody.name,
        userId:requestBody.userId,
        password:bcrypt.hashSync(requestBody.password,8),
        email:requestBody.email,
        userType:requestBody.userType
    }

    try{
        const user= await User.create(userObj);

        return res.status(200).json({
            success:true,
            message:"User created Successfully",
            user
        })
    }
    catch(err){
        console.log("Error while registering the user",err)
        return res.status(500).json({
            success:false,
            message:"Some error happened while registering the user"
        })
    }
}