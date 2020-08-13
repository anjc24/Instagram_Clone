const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const User = mongoose.model("User")
const jwt = require('jsonwebtoken')
const {JWT_SECRET} = require('../config/keys')
const requireLogin = require('../middlewares/requireLogin')



router.post('/signup',(req,res)=>{
    const{name, email, password,pic}= req.body;
    if(!email || !password || !name){
        return res.status(422).json({error:"please add all the fields"})
    }
    User.findOne({email:email})
    .then((savedUser)=>{
        if(savedUser){
        return res.status(422).json({error:"User already exists with that Username"})
        }
        const user = new User({
           email,
           password,
           name,
           pic
        })

        user.save()
        .then(user=>{
            res.json({message:"Successfully Signed Up !"})
        })
        .catch(err=>{
            console.log(err);
        })
    })
    .catch(err=>{
        console.log(err);
    })
    
})

router.post('/signin', (req,res)=>{
    const {email,password} = req.body
    if(!email || !password){
        res.status(422).json({error:"please provide email or password"})
    }
    User.findOne({
        email:email
    })
    .then(savedUser=>{
        if(!savedUser){
            res.status(422).json({error:"Invalid Email or Password "})
        }
        if(password == savedUser.password)
        {
            //res.json({message:"Successfully signed in "})
            const token = jwt.sign({_id:savedUser._id}, JWT_SECRET)
            const{_id,name,email,followers,following,pic}=savedUser
            res.json({token, user:{_id,name,email,followers,following,pic}})
        }
        else{
            res.status(422).json({error:"Invalid Email or Password "})
        }
    })
    .catch(err=>{
        console.log(err);
    })
})

module.exports=router