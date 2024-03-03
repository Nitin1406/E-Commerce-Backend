const User=require("../models/user.model");
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");
require("dotenv").config();

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
};


exports.login= async (req,res) =>{

    const user = await User.findOne({userId:req.body.userId});

    if(!user){
        return res.status(400).json({
            success:false,
            message:"User not registered"
        })
    }

    const isPasswordValid= await bcrypt.compareSync(req.body.password,user.password);

    if(!isPasswordValid){
        return res.status(401).json({
            success:false,
            message:"Password is wrong"
        })
    }


    const token= jwt.sign({id:user.userId},process.env.SECRET,{expiresIn:120})

    return res.status(200).json({
        name:user.name,
        userId:user.userId,
        email: user.email,
        userType: user.userType,
        accessToken: token
    })
}