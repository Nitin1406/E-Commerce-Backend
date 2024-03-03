
const User=require("../models/user.model");
const jwt= require('jsonwebtoken')
require("dotenv").config()
exports.verifySignUpbody= async (req,res, next)=>{

    try{

        if(!req.body.name){
            return res.status(400).json({
                success:false,
                message: "Failed! Name is not provided in request body"
            })
        }

        if(!req.body.email){
            return res.status(400).json({
                success:false,
                message: "Failed! Email is not provided in request body"
            })
        }

        if(!req.body.userId){
            return res.status(400).json({
                success:false,
                message: "Failed! UserId is not provided in request body"
            })
        }

        if(!req.body.password){
            return res.status(400).json({
                success:false,
                message: "Failed! Password is not provided in request body"
            })
        }

        const user= await User.findOne({userId: req.body.userId})
        if(user){
            return res.status(400).json({
                success:false,
                message:"Failed! User with same userId is already present"
            })
        }

        next();

    }
    catch(err){
        console.log("Error while validating the request object", err);
        return res.status(400).json({
            success:false,
            message:"Error while verifying signup body"
        })
    }
}

exports.verifyLoginBody= async (req,res,next)=>{
    
    if(!req.body.userId && !req.body.password){
        return res.status(400).json({
            success:false,
            message:"Please provide userId and Password!!!"
        })
    }
    if(!req.body.userId){
        return res.status(400).json({
            success:false,
            message:"Please provide userId carefully"
        })
    }

    if(!req.body.password){
        return res.status(400).json({
            success:false,
            message:"Please provide password carefully"
        })
    }

    next();
}

exports.verifyToken= async (req, res, next)=>{

    const token= req.headers['x-access-token'];

    if(!token){
        return res.status(403).json({
            success:false,
            message:"No token is found : UnAuthorized"
        })
    }

    jwt.verify(token, process.env.SECRET, async (err, decoded)=>{
        if(err){
            return res.status(401).json({
                success:false,
                message:"Token UnAuthorized"
            })
        }

        const user= await User.findOne({userId : decoded.id});

        if(!user){
            return res.status(401).json({
                message:"UnAuthorized, this user for this token doesn't exists"
            })
        }
        req.user=user;
        next();
    })

    
}

exports.isAdmin= async (req, res, next)=>{

    const user = req.user;

    if(user && user.userType =="ADMIN"){
        next();
    }else{
        return res.status(400).json({
            success:false,
            message:"Only ADMINs are allowed to add new Category"
        })
    }
    
}
