import React,{useEffect,useState,useContext} from 'react'
import {UserContext} from '../../App'

const Profile = ()=>{
	const [mypics,setPics] = useState([])
	const {state,dispatch} = useContext(UserContext)
	const [image,setImage] = useState("")
	const [url,setUrl] = useState("")

	useEffect(()=>{
			fetch('/mypost',{
				headers:{
					"Authorization":"Bearer "+localStorage.getItem("jwt")
				}
			}).then(res=>res.json())
			.then(result=>{
				setPics(result.mypost)
			})
	},[])
	useEffect(()=>{
		if (image) {
		const data = new FormData()
        data.append("file",image)
        data.append("upload_preset","instaclone")
        data.append("cloud_name","Student")
        fetch("https://api.cloudinary.com/v1_1/studentinsta/image/upload",{
            method:"post",
            body:data
        })
        .then(res=>res.json())
        .then(data=>{
           localStorage.setItem("user",JSON.stringify({...state,pic:data.pic}))
		   dispatch({type:"UPDATEPIC",payload:data.pic})

        fetch('/updatepic',{
           	method:"put",
           	headers:{
           			"Content-Type":"application/json",
					"Authorization":"Bearer "+localStorage.getItem("jwt")
				},
				body:JSON.stringify({
					pic:data.url
				})

           }).then(res=>res.json())
			.then(result=>{
				console.log(result)
				localStorage.setItem("user",JSON.stringify({...state,pic:result.pic}))
				dispatch({type:"UPDATEPIC",payload:result.pic})
				window.location.reload()			
			})
      
        })
        .catch(err=>{ 
            console.log(err)
        })
		}
	},[image])
const updatPhoto = (file)=>{
		setImage(file)
        
}
	return (
		<div style={{maxWidth:"850px", margin:"0px auto"}}>
		<div style={{
			margin:"18px 0px",
				boederBottom:"1px solid grey"
			}}>


	
			<div style={{
				display:"flex",
				justifyContent:"space-around",
			}}> 
				<div>
					<img style={{width:"160px", height:"160px", borderRadius:"80px"}}
					src={state?state.pic:"Loading"}
					/> 
					
				</div>
				<div> 
					<h4> {state?state.name:"Loading"} </h4>
					<h5> {state?state.email:"Loading"} </h5>
					<div style={{display:"flex",justifyContent:"space-between",width:"108%"}}>
						<h4>{mypics.length} Posts</h4>
						<h4>{state ? state.followers.length:"0" } Followers </h4>
						<h4>{state ? state.following.length:"0" }  Following </h4>
					</div>
				</div> 
			</div>
				<div className="file-field input-field">
				     <div className="btn #d7ccc8 brown lighten-3">
				        <span>Update Profile Pic</span>
				        <input type="file" onChange={(e)=>updatPhoto(e.target.files[0])}/>
				      </div>
				      <div className="file-path-wrapper">
				        <input className="file-path validate" type="text"/>
				     </div>
			   		</div>
			</div>
			<div className="gallery">
				{
					mypics.map(item=>{
						return(
							<img key={item._id} className="item" src={item.photo} alt={item.title}/> 
				
							)
					})
				}
				</div>
		</div>

		)
}

export default Profile