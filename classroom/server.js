const express=require("express");
const session = require("express-session");
const app=express();

app.use(session({secret:"mysecretkey"}));

app.get("/test",(req,res)=>{
    res.send("test is sucessful");
})

app.listen(3000,()=>{
    console.log("server is running on 3000");
})