const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const User = mongoose.model("User")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {JWT_SECRET} = require('../keys')
const requireLogin = require('../middleware/requireLogin')

router.get('/',(req,res)=>{
	res.send("Hello Arjun ")

})

router.get('/protected',requireLogin, (req,res)=>{
	res.send("Hello User")
})

router.post('/signup', (req,res)=>{
	const {name,email,password,pic} = req.body
	if(!email || !password || !name){
		return res.status(422).json({error:"Please Add All Field"})
	}
	User.findOne({email:email})
	.then((savedUser)=>{
		if(savedUser){
			return res.status(422).json({error:"user already exists with that email"})
		}
		bcrypt.hash(password,12)
		.then(hashedpassword=>{
			const user = new User({
		 	email,
		 	password:hashedpassword,
		 	name,
		 	pic
		 }) 

		 user.save()
		 .then(user=>{
		 	res.json({message:"Saved Successffully"})
		 })
		 .catch(err=>{
		 	console.log(err)
		 })

		})
		 
	})
	.catch(err=>{
	console.log(err)
	})
})



router.post('/signin', (req,res)=>{
	const {email,password} = req.body
	if (!email || !password) {
		res.status(422).json({error:"Plese provide email or password"})
	}
	User.findOne({email:email})
	.then(savedUser=>{
		if(!savedUser){
			res.status(422).json({error:"Invalid Email or Password  "})
		}
		bcrypt.compare(password,savedUser.password)
		.then(doMatch=>{
			if(doMatch){
				//res.json({message:"Successffully signed in "})
				const token = jwt.sign({_id:savedUser._id},JWT_SECRET)
				const {_id,name,email,followers,following,pic} = savedUser
				res.json({token,user:{_id,name,email,followers,following,pic}})
			}
			else{
				res.json({message:"Invalid Email or password "})
			}
		})
		.catch(err=>{
			console.log(err)
		})

	})
})

module.exports = router