const User=require("../models/user")
const errorHandler = require("./helper/dbErrorhandler")

exports.signUp=async(req,res)=>{
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