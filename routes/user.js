const express=require('express');
const { signIn } = require('../controller/user');

const router=express.Router()

router.get('/',signIn);

module.exports=router;