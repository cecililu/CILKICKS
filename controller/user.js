const user = require("../models/user");

exports.userById=(req,res,next,id)=>{
    user.findById(id).exec((err,user)=>{
        if (err || !user){
            return res.status(400).json({
                errorr:"user not found"
            })
          
        }
        req.profile=user
    });
};