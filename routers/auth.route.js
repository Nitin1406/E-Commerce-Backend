const express=require("express");
const { signup, login } = require("../controllers/auth.controller");
const route=express.Router();
const {verifyLoginBody,verifySignUpbody, verifyToken, isAdmin}= require("../middlewares/auth.mw");
const { createNewCategory } = require("../controllers/category.controller");


route.post("/auth/signup",verifySignUpbody,signup);
route.post("/auth/login",verifyLoginBody,login);
route.post("/categories",verifyToken,isAdmin,createNewCategory)

module.exports=route;
