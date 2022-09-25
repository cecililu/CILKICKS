const User = require("../models/user");

exports.userById=(req,res,next,id)=>{
    console.log("  byid  ")
    User.findById(id).exec((err,user)=>{
        if (err || !user){
            return res.status(400).json({
                error:"user not found"
            }) 
        }
       
        req.profile=user
        next()
    });
   
};