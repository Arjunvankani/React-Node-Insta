import React,{useState,useEffect} from 'react';
import {Link,useHistory} from 'react-router-dom'
import M from 'materialize-css'


const Signup = ()=>{
	const history = useHistory()
	const [name,setName] = useState("")
	const [password,setPassword] = useState("")
	const [email,setEmail] = useState("")
	const [image,setImage] = useState("")
	const [url,setUrl] = useState("")

	useEffect(()=>{
		if(url){
			uploadFields()
		}
	},[url])

	
 const uploadPic = ()=>{
        const data = new FormData()
        data.append("file",image)
        data.append("upload_preset","instaclone")
        data.append("cloud_name","student")
        fetch("https://api.cloudinary.com/v1_1/studentinsta/image/upload",{
            method:"post",
            body:data
        })
        .then(res=>res.json())
        .then(data=>{
           setUrl(data.url)
        })
        .catch(err=>{
            console.log(err)
        })
    }
	
	const uploadFields = ()=>{
		if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
			  M.toast({html: "Invalid Email",classes:"#78909c blue-grey lighten-1"})
			 return 
		}
		fetch("/signup",{
			method:"post",
			headers:{
				"Content-Type":"application/json"
			},
			body:JSON.stringify({
				name,
				password,
				email,
				pic:url
			})
		}).then(res=>res.json())
		.then(data=>{
			if(data.error){
				  M.toast({html: data.error,classes:"#78909c blue-grey lighten-1"})
			}
			else{
				 M.toast({html: data.message,classes:"#ffcc80 orange lighten-3"})
				history.push('/signin')
			}
		}).catch(err=>{
			console.log(err)
		})
	}

	const PostData = ()=>{
		if(image){
			uploadPic()
		}
		else{
			uploadFields()
		}
		
	}

	return (
		<div className="mycard">
			<div className="card auth-card input-field">
	        	<h2> Instagram </h2>
	        	<input
	        	type="text"
	        	placeholder="name"
	        	value={name}
	        	onChange={(e)=>setName(e.target.value)}
	        	/> 
	        	<input
	        	type="text"
	        	placeholder="email"
	        	value={email}
	        	onChange={(e)=>setEmail(e.target.value)}
	        	/>
	        	<input
	        	type="password"
	        	placeholder="password"
	        	value={password}
	        	onChange={(e)=>setPassword(e.target.value)}
	        	/>  
		        	<div className="file-field input-field">
				     <div className="btn #d7ccc8 brown lighten-3">
				        <span>Upload Profile Pic</span>
				        <input type="file" onChange={(e)=>setImage(e.target.files[0])}/>
				      </div>
				      <div className="file-path-wrapper">
				        <input className="file-path validate" type="text"/>
				     </div>
			   		</div>
	        	<button className="btn waves-effect waves-light, #ce93d8 purple lighten-3"  onClick={()=>PostData()}>
	        	 	Sign Up
				</button>
				<h5> 
					<Link to="/signin">Already have an account ?</Link>
				</h5>
          	</div>
        </div>
		)
}

export default Signup