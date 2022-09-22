const express=require("express")
const app=express()
require('dotenv').config()


app.get('/',(req,res)=>{
    res.send("Welcome to cilKICKS")
})

app.listen(process.env.PORT,()=>{
    console.log('SERVER RUNNING IN PORT'+process.env.PORT)
})