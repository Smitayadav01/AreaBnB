const mongoose=require("mongoose");
const Schema=mongoose.Schema;
// passport local mongoose automatically creates and stored the username and password  
const passportLocalMongoose=require("passport-local-mongoose").default;



const userSchema= new Schema({
    email:{
        type:String,
        required:true,
    },
})

userSchema.plugin(passportLocalMongoose);

module.exports=mongoose.model("User",userSchema);