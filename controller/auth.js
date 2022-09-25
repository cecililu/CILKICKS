const User=require("../models/user")
const errorHandler = require("../helper/dbErrorhandler")

const jwt=require('jsonwebtoken')
var { expressjwt} = require("express-jwt");
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
    if(!validpass){
        return res.status(400).json({"error":"password dont match"})
    }
    existuser.salt=undefined
    existuser.hashed_password=undefined
   try{
  
    const token=jwt.sign({email:existuser.email,
                    id:existuser.id},'secret')
    res.cookie('t',token,{expire:new Date()+9999})
    res.status(200).send({token,user:existuser});
    }
    catch(error)
    {  
        res.status(400).send({error});

    }   
}


exports.signOutHandler=async(req,res)=>{
   res.clearCookie('t')
   res.send({message:'Signout'})
}

exports.requireSignin=expressjwt({
    secret:'secret',
    userProperty:'auth',
    algorithms: ["HS256"]
    
})

exports.dashbordHandler=async(req,res)=>{
    
    res.send("Hello dashboard")
 }

exports.isAuth=(req,res,next)=>{
    console.log(req.auth.id==req.profile._id)
    console.log(req.profile)
    console.log(req.auth)

   let  user=req.profile  && req.auth && req.profile._id==req.auth.id
   if (!user){
    return res.status(403).json({
        error:'access denied'
    })
   }
   next()
}
exports.isAdmin=(req,res,next)=>{
    console.log('admin?')
    if (req.profile.role===0){
       return res.status(403).json({error:'no admin access' });
    }

    next();
}