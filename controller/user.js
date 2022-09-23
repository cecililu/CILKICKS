const User=require("../models/user")

exports.signUp=async(req,res)=>{
    try{
    const user= await new User(req.body).save()
    res.send(user)
    }catch(err){
    res.send(err)
    }
   
    
  
}