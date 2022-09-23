const express=require('express');
const { signUp } = require('../controller/user');
const { useSignUpValidator, useSignUpValidatorArr } = require('../validators');

const router=express.Router()


router.post('/signup',useSignUpValidatorArr,useSignUpValidator,signUp);

module.exports=router;