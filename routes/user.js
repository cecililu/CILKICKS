const express=require('express');
const { signUpHandler, signInHandler } = require('../controller/user');
const { useSignUpValidator, useSignUpValidatorArr } = require('../validators');

const router=express.Router()


router.post('/signup',useSignUpValidatorArr,useSignUpValidator,signUpHandler);
router.post('/signin',signInHandler)
module.exports=router;