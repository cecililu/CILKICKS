const express=require("express")
const { dbconnect } = require("./dbconnect")
const app=express()
require('dotenv').config()


app.get('/',(req,res)=>{
    res.send("Welcome to cilKICKS")
})


dbconnect();
app.listen(process.env.PORT,()=>{
    console.log('SERVER RUNNING IN PORT'+process.env.PORT)
})


