const express=require("express");
const { signup } = require("../controllers/auth.controller");
const route=express.Router();


route.post("/auth/signup",signup);


module.exports=route;
