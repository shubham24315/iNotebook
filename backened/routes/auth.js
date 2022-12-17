const { default: userEvent } = require('@testing-library/user-event');
const express=require('express')
const User=require('../models/User')
const router=express.Router()
const {body,validationResult}=require('express-validator');
const { response } = require('express');
const bcrypt=require('bcryptjs');
var jwt = require('jsonwebtoken');
var fetchuser=require('../middleware/fetchuser')

const JWT_SECRET='Harryisagoodb$oy';
//Create a User using;POST "/api/auth/"
router.post('/createuser',[
    body('name').isLength({min:3}),
    body('email').isEmail(),
    body('password').isLength({min: 5}),

],async(req,res)=>{
  let success=false;
  // if there are errors , return bad requets and error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success,errors: errors.array() });
    }
    try{
    //check whethere the uset with this email exists already
    let user=await User.findOne({email:req.body.email});
    if(user) {
      return res.status(400).json({success,error:"sorry a uset with this email alredy exists"})
    }   
    const salt=await bcrypt.genSalt(10);
    secPass=await bcrypt.hash(req.body.password,salt)
      user= await User.create({
        name: req.body.name,
        password: secPass,
        email:req.body.email,
      })
      // .then(user => res.json(user)).catch(err=> {console.log(err) 
      // res.json({error:'Please enter a unique value for email',message:err.message})});
      
    // res.send(req.body);
    const data={
      user:{
         id:user.id
      }
    }
    const authtoken=jwt.sign(data,JWT_SECRET)
   success=true;
    res.json({success,authtoken})
    }
    catch(error){
      console.error(error.message);
      res.status(500).send("some error occured");
    }
})


//authenicate a user using :post "/api/auth/login"
router.post('/login',[
 
  body('email').isEmail(),
  body('password','Password cannot be blank').exists(),

],async(req,res)=>{

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
   const {email,password}=req.body;
   try{
     let user=await User.findOne({email});
     if(!user){
     let sucess=false;
      return res.status(400).json({error:"sorry user does not exists"})
     }
     const passwordCompare=await bcrypt.compare(password,user.password);
      if (!passwordCompare) {
        success=false;
        return res.status(400).json({success,error:"sorry user does not exists"})       
      }
      const data={
        user:{
          id:user.id
        }
      }
      const authtoken=jwt.sign(data,JWT_SECRET);
      success=true
      res.json({success,authtoken})
   }catch(error){
    console.error(error.message);
    res.status(500).send("some error occured");    
   }
})


// ger loggedin user details:login required
router.post('/getuser',fetchuser,async(req,res)=>{
  try {
    userId=req.user.id;
    const user=await User.findById(userId).select("-password")
    res.send(user)
  } catch (error) {
    console.error(error.message);
    res.status(500).send("some error occured");   
  }
})

module.exports=router