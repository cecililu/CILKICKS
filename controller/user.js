const User = require("../models/user");

exports.userById=(req,res,next,id)=>{
    console.log(req.body)
    User.findById(id).exec((err,user)=>{
        if (err || !user){
            return res.status(400).json({
                errorr:"user not found"
            }) 
        }
        // console.log('frm conro',user)
        req.profile=user
        
         next()
    });
    
};