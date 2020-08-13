import React,{useState, useEffect} from 'react'
import {Link,useHistory } from 'react-router-dom'
import M from 'materialize-css'

const SignIn = ()=>{
    const history = useHistory()
    const [name, setName]= useState("")
    const [password, setPassword]= useState("")
    const [email, setEmail]= useState("")
    const [image,setImage] =useState("")
    const [url,setUrl]= useState(undefined)
    useEffect(()=>{
      if(url){
          uploadFields()
      }
    },[url])

    const uploadPic = ()=>{
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

    const uploadFields = ()=>{
        // if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
        //     M.toast({html: "invalid email", classes:"#c62828 red darken-3"})
        //     return
        // }
        fetch("/signup",{
        method:"post",
        headers:{
           "Content-Type" : "application/json"
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
            M.toast({html: data.error, classes:"#c62828 red darken-3"})
        }
        else{
            M.toast({html:data.message,classes:"#43a047 green darken-1"})
            history.push('/signin')
        }
    }).catch(err=>{
        console.log(err);
    })
    }

    const PostData = ()=>{
        if(image){
            uploadPic()
        }else{
             uploadFields()
        }
       
}

   return(
<>
    <div style={{margin:"0"}} className="row justify-content-center pt-md-2 pt-1 signin" >
      
        <div style={{padding:"0"}} className="home col-md-5 col-12 ">
        <div className="mycard" >
          <div className="card auth-card input-field" style={{padding:"4rem"}}>
          <img style={{width:"50%",height:"50%",margin:"auto",marginBottom:"2rem"}} src={require('../dummy/logo.png')} />
     
                <input 
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e)=>setName(e.target.value)}
              style={{textAlign:"center",border:"1px solid #c7c7c7",backgroundColor:"#fafafa",height:"2.5rem",borderRadius:"5px"}}
              />
              <input 
              type="text" 
              placeholder="Username"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              style={{textAlign:"center",border:"1px solid #c7c7c7",backgroundColor:"#fafafa",height:"2.5rem",borderRadius:"5px"}}
              />             
              <input 
              type="password" 
              placeholder="Password"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              style={{textAlign:"center",border:"1px solid #c7c7c7",backgroundColor:"#fafafa",height:"2.5rem",borderRadius:"5px"}}
              />




            <div style={{height:"2rem",marginTop:"0"}} className="file-field input-field">
            <div  style={{lineHeight:"1rem",boxShadow:"none",border:"1px solid #c7c7c7",width:"100%",backgroundColor:"#fafafa"}} className="btn  unfollow-btn">
                 <span style={{textTransform:"capitalize",color:"#505050"}}>Profile Pic &nbsp; &nbsp;<i class="fas fa-upload"></i></span>
                 <input type="file"
                 onChange={(e)=>setImage(e.target.files[0])}
                 />
             </div>
             <div style={{visibility:"hidden"}} className="file-path-wrapper">
                 <input className="file-path validate" type="text"/>
             </div>
            </div>

            <button onClick={()=>PostData()} className="btn follow-btn" style={{lineHeight:"0rem", textTransform:"capitalize",margin:"1rem 0" }}>
                Sign Up
            </button>
            <h5>
                <Link to="/signin" style={{fontSize:"1rem", fontWeight:"400"}}> Have an account ? <span style={{color:"#0095f6"}}>Sign In</span></Link>
            </h5>
          </div>
      </div>
         <p style={{textAlign:"center",marginTop:"1rem"}}>Get the app.</p>
         <div style={{display:"flex",justifyContent:"center"}}>
          <img style={{width:"20%",height:"20%",margin:"0 0.5rem"}} src={require('../dummy/app.png')} />
          <img style={{width:"20%",height:"20%",margin:"0 0.5rem"}} src={require('../dummy/play.png')} />
         </div>
        </div>
        
    </div>
    <div className="row  signinbottom justify-content-center mt-5 pt-5">
            <div className="col-md-6 col-12 " style={{color:"#00376b",fontSize:"0.8rem",fontWeight:"500"}}>
             ABOUT &nbsp;  &nbsp; HELP&nbsp; &nbsp;  PRESS&nbsp; &nbsp;   API&nbsp; &nbsp;    JOBS&nbsp; &nbsp; PRIVACY
             &nbsp; &nbsp; TERMS&nbsp; &nbsp;  LOCATIONS&nbsp; &nbsp;  TOP&nbsp; &nbsp;  ACCOUNTS&nbsp; &nbsp;  HASHTAGS &nbsp; &nbsp;LANGUAGE

            </div>
            <div  style={{fontSize:"0.8rem",fontWeight:"500"}} className="ta-l text-muted col-md-3 col-12">
              INSTAGRAM CLONE : ANJALI
            </div>

        </div>
      



      {/* <div className="mycard">
          <div className="card auth-card input-field">
              <h2>Instagram</h2>
              <input 
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e)=>setName(e.target.value)}
              />
              <input 
              type="text" 
              placeholder="Username"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              />             
              <input 
              type="password" 
              placeholder="Password"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              />
            <div className="file-field input-field">
             <div className="btn  #64b5f6 blue lighten-2">
                 <span>Upload Pic</span>
                 <input type="file"
                 onChange={(e)=>setImage(e.target.files[0])}
                 />
             </div>
             <div className="file-path-wrapper">
                 <input className="file-path validate" type="text"/>
             </div>
            </div>

            <button onClick={()=>PostData()} className="btn waves-effect waves-light #64b5f6 blue lighten-2">
                SignUp
            </button>
            <h5>
                <Link to="/signin">Already have an account</Link>
            </h5>
          </div>
      </div> */}

      </>
   )
}

export default SignIn