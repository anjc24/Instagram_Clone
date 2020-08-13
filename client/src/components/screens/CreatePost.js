import React, { useState, useEffect } from 'react'
import M from 'materialize-css'
import {useHistory} from 'react-router-dom'

const CreatePost = ()=>{

    const history= useHistory()
    const [body, setBody]=useState("")
    const [image, setImage]=useState("")
    const [url,setUrl]=useState("")
    useEffect(()=>{
        if(url){

        fetch("/createpost",{
            method:"post",
            headers:{
               "Content-Type" : "application/json",
               "Authorization": "Bearer " + localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                body,
                pic:url
            })
        }).then(res=>res.json())
        .then(data=>{
            if(data.error){
                M.toast({html: data.error, classes:"#c62828 red darken-3"})
            }
            else{
                M.toast({html:"Posted Successfully!",classes:"#43a047 green darken-1"})
                history.push('/')
            }
        }).catch(err=>{
            console.log(err);
        })
                    
    }
    },[url])

    const postDetails=()=>{
        const data = new FormData();
        data.append("file", image)
        data.append("upload_preset","insta-clone")
        data.append("cloud_name","anjc24")
        fetch("https://api.cloudinary.com/v1_1/anjc24/image/upload",{
            method:"post",
            body:data
        })
        .then(res=>res.json())
        .then(data=>{
            setUrl(data.url)
        })
        .catch(err=>{
            console.log(err);
        })

   
    }

    return(
<>
        <div style={{margin:"0"}} className="row justify-content-center pt-md-5 pt-5 mt-5 mt-md-0" >
            <div style={{padding:"0",textAlign:"center"}} className="home col-md-5 col-12  ">
             <h3>New Post</h3>
            </div>
        </div>
        
        
        <div style={{margin:"0"}} className="row justify-content-center pt-md-2 pt-1" >
      
        <div style={{padding:"0"}} className="home col-md-5 col-12  ">
        <div className="card input-filed"
         style={{
             margin:"10px auto",
             maxWidth:"500px",
             padding:"20px",
             textAlign:"left"
         }}
        >

            <input type="text"
            placeholder="Write a caption..."
            value={body}
            onChange={(e)=>setBody(e.target.value)}
            />
            <div className="file-field input-field">
             <div  style={{lineHeight:"1rem",boxShadow:"none",border:"1px solid #c7c7c7"}} className="btn  unfollow-btn">
                 <span>Upload Image</span>
                 <input type="file"
                 onChange={(e)=>setImage(e.target.files[0])}
                 />
             </div>
             <div className="file-path-wrapper">
                 <input className="file-path validate" type="text"/>
             </div>
            </div>
            <hr/>
            Tag People
            <hr/>
            Add location
            <hr/>
            <span style={{display:"inline-block"}}>
            Also post to Facebook
            
            </span>
            <hr/>
            Advanced Settings
            <hr/>


            <button 
            onClick={()=>postDetails()}
            className="btn follow-btn" style={{lineHeight:"0rem"}}>
                Share Post
            </button>
        </div>
        </div>
        </div>
    </>
    )
}

export default CreatePost