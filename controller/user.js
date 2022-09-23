const User=require("../models/user")
const errorHandler = require("./helper/dbErrorhandler")

const jwt=require('jsonwebtoken')
const jwtExpress=require('express-jwt')
const bcrypt=require("bcryptjs")
exports.signUpHandler=async(req,res)=>{
    try{
    const user= await new User(req.body).save()
    user.salt=undefined
    user.hashed_password=undefined
    res.send(user)
    }
    catch(err){
       res.json(errorHandler(err))
    }  
}

exports.signInHandler=async(req,res)=>{
    const {email,password}=req.body
    const existuser=await User.findOne({email})
    // console.log(existuser)
    if (!existuser){
        return res.status(400).json({"error":"user with that email doesnot esits"})
    }
   //email password verification
   
    const validpass=await bcrypt.compare(password, existuser.hashed_password)
   try{
   if (validpass){
    const token=jwt.sign({email:existuser.email,
                    id:existuser.id},'secret')

    res.status(200).send({token,data:"ok token sent" });
    }}
    catch(error)
    {  
        res.status(400).send({error});

    }   
}
