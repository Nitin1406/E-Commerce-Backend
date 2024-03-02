
const User=require("../models/user.model");
const verifySignUpbody= async (req,res, next)=>{

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

module.exports=verifySignUpbody;