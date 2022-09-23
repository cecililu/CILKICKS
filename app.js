const express=require("express")
const morgan=require('morgan')
const  bodyparser=require('body-parser')
const { dbconnect } = require("./dbconnect")
const userRouter= require("./routes/user")
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")
// const expressValidator=require('express-validator')
const app=express()

require('dotenv').config()





dbconnect();
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(cookieParser())
// app.use(expressValidator)
app.use('/api/v1',userRouter)

app.listen(process.env.PORT,()=>{
    console.log('SERVER RUNNING IN PORT'+process.env.PORT)
})


