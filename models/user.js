const mongoose= require("mongoose");

const bcrypt=require("bcryptjs")




const userSchema=new mongoose.Schema({
       name:{
        type:String,
        trim:true,
        required:true,
        maxlength:32
       },

       email:{
        type:String,
        trim:true,
        required:true,
        unique:true
       },

       hashed_password:{
        type:String,
        required:true,       
       },

       about :{
        type:String,
        trim:true,
       
       },

       salt:
       { type: String}
       ,

       role:{
        type: Number,
        default:0
       },
       history:{
        type:Array,
        default:[]
       }

},{timestamps:true});

userSchema.virtual('password')
.set(function(password){
    this._password=password
    this.salt=  bcrypt.genSaltSync(10)
    this.hashed_password=bcrypt.hashSync(password)
})
.get(function(){
    return this._password
})

module.exports=mongoose.model('User',userSchema)