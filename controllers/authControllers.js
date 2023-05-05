
const User = require('./../models/authModel');
const jwt = require('jsonwebtoken');
require("dotenv").config();

const createToken = async (id) => {
    return jwt.sign({id},process.env.JWT_SECRET_KEY,{
        expiresIn: 3*24*60*60
    })
}

const handleErrors = (error) => {
    // console.log(error);
    if(error.code===11000){
        return {email:"Email already exists"};
    }
    let errors = {};
    Object.values(error.errors).forEach((item)=>{
        errors[item.properties.path] = item.properties.message;
    })
    // console.log(errors);
    return errors;
}

module.exports.signUp_Get = (req,res) => {
    res.render('signup');
}
module.exports.signUp_Post = async (req,res) => {
    // console.log(req.body);
    const {email,password} = req.body;
    try{
        // console.log({email:email,password:password});
        const user = await User.create({email:email,password:password});
        const token = await createToken(user._id);
        // console.log("Token : =>",token)
        res.cookie('jwt',token,{httpOnly:true,maxAge:3*24*60*60*1000});
        res.status(201).json({user:user._id});
    }
    catch(e){
        const errObj = handleErrors(e);
        // console.log("\nsend the error",errObj)
        res.status(400).json(errObj);
    }
}


module.exports.login_Get = (req,res) => {
    res.render('login');
}
module.exports.login_Post =async (req,res) => {
    const {email,password} = req.body;
    try{
        const user =await User.login(email,password);
        const token =await createToken(user._id);
        res.cookie('jwt',token,{httpOnly:true,maxAge:3*24*60*60*1000});
        res.status(201).json({user:user._id});
    }
    catch(e){
        res.status(400).json({message:e.message});
    }
    
}
module.exports.logout_GET =async (req,res) => {
    res.cookie('jwt','',{maxAge:1});
    res.redirect('/')
}
   