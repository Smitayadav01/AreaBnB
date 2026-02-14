const express=require("express");
const { route } = require("./listing");
const router=express.Router({mergeParams:true});
const User=require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");

router.get("/signup",(req,res)=>{
    res.render("users/signup.ejs");
})

router.post("/signup",wrapAsync(async(req,res)=>{
    try{
        let{username,email,password}=req.body;
        const newUser=new User({email,username});
        const regitereduser=await User.register(newUser,password);
        req.login(regitereduser,(err)=>{
            if(err){
                return next(err);
            }
            req.flash("success","welcome to AreaBnB");
            res.redirect("/listings");
        })
    } catch(e){
        req.flash("error",e.message);
        res.redirect("/signup");
    }
    
}))

router.get("/login",(req,res)=>{
    res.render("users/login.ejs");
})

router.post("/login",saveRedirectUrl,passport.authenticate("local",{failureRedirect:"/login", failureFlash:true}),async (req,res)=>{
    req.flash("success","welcome back to AreaBnB");
    let redirectUrl=res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
})

router.get("/logout",(req,res,next)=>{
    req.logout((err)=>{
        if(err){
           return next(err);
        }
        req.flash("success","you are logout!");
        res.redirect("/listings")
    })
})

module.exports=router;