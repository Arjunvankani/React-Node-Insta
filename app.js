const express = require('express')
const app = express()
const mongoose = require('mongoose')
const PORT =5000
const {MONGOURI} = require('./keys')
//3Z0i8mteyyUMIuaS



mongoose.connect(MONGOURI,{
	useNewUrlParser: true,
	useUnifiedTopology: true
})
mongoose.connection.on('connected', ()=>{
	console.log("connected to monogo Yeah !")
})
mongoose.connection.on('error', (err)=>{
	console.log("Error connecting !",err)
})

require('./models/user')
require('./models/post')


app.use(express.json())
app.use(require('./routes/auth'))
app.use(require('./routes/post'))
app.use(require('./routes/user'))

/*
const customMiddleware = (req,res,next)=>{
	console.log("Middleware executed !!")
	next()
}


app.get('/',(req,res)=>{
	console.log("home")
	res.send("Hello !")
})

app.get('/about',customMiddleware,(req,res)=>{
	console.log("about")
	res.send("About Page !")
})*/





app.listen(PORT,()=>{
	console.log("Server is runnig ...",PORT)
})