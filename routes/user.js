const express=require('express');
const { signUpHandler, signInHandler,signOutHandler, requireSignin, dashbordHandler } = require('../controller/user');
const { useSignUpValidator, useSignUpValidatorArr } = require('../validators');

const router=express.Router()


router.post('/signup',useSignUpValidatorArr,useSignUpValidator,signUpHandler);
router.post('/signin',signInHandler)
router.get('/signout',signOutHandler)
router.get('/dashboard',requireSignin,dashbordHandler)
module.exports=router;
