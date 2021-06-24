const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types

const userSchema = new mongoose.Schema({
	name:{
		type:String,
		require:true
	},
	email:{
		type:String,
		require:true
	},
	password:{
		type:String,
		require:true
	},
	pic:{
		type:String,
		default:"https://res.cloudinary.com/studentinsta/image/upload/v1590317480/e3_fzaoix.jpg"
	},
	followers:[{type:ObjectId,ref:"User"}],
	following:[{type:ObjectId,ref:"User"}]	 
})

module.exports = mongoose.model("User", userSchema)