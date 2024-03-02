const express=require("express");
const { signup } = require("../controllers/auth.controller");
const route=express.Router();
const authMW= require("../middlewares/auth.mw");


route.post("/auth/signup",authMW,signup);


module.exports=route;
