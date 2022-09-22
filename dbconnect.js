const mongoose= require('mongoose')
require("dotenv").config();

const dbconnect=()=>{
    mongoose.connect(process.env.DB,()=>{
        console.log('DB connection Succesful')
    })
}

module.exports={dbconnect}