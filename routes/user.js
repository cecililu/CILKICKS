const express=require('express');

const { requireSignin } = require('../controller/auth');
const { userById} = require('../controller/user');

const router=express.Router()


router.param('userId',userById)

router.get('/secret/:userId',requireSignin,(req,res)=>{
    console.log('conroller')
    res.json({ user: req.profile })
})


module.exports=router;