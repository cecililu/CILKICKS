const User=require("../models/user")
const errorHandler = require("./helper/dbErrorhandler")

exports.signUp=async(req,res)=>{
    try{
    const user= await new User(req.body).save()
    res.send(user)
    }catch(err){
       res.json(errorHandler(err))
    }
   
    
  
}