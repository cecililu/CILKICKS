const express=require('express');

const { requireSignin, isAuth } = require('../controller/auth');
const { userById} = require('../controller/user');

const router=express.Router()




router.get('/secret/:userId',requireSignin,isAuth,(req,res)=>{
    console.log('conroller')
    res.json({ user: req.profile })
})
router.param('userId',userById)

module.exports=router;