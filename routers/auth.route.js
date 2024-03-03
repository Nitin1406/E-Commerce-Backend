const express=require("express");
const { signup, login } = require("../controllers/auth.controller");
const route=express.Router();
const authMW= require("../middlewares/auth.mw");


route.post("/auth/signup",authMW,signup);
route.post("/auth/login",login);

module.exports=route;
