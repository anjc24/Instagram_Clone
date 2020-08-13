import React,{useState,useContext} from 'react'
import {Link, useHistory } from 'react-router-dom'
import {UserContext} from '../../App'
import M from 'materialize-css'

const SignIn = ()=>{
    const {state,dispatch} = useContext(UserContext)
    const history = useHistory()
    const [password, setPassword]= useState("")
    const [email, setEmail]= useState("")
    const PostData = ()=>{
        // if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
        //     M.toast({html: "invalid email", classes:"#c62828 red darken-3"})
        //     return
        // }
        fetch("/signin",{
        method:"post",
        headers:{
           "Content-Type" : "application/json"
        },
        body:JSON.stringify({
            email,
            password
        })
    }).then(res=>res.json())
    .then(data=>{
        console.log(data);
        if(data.error){
            M.toast({html: data.error, classes:"#c62828 red darken-3"})
        }
        else{
            localStorage.setItem("jwt", data.token)
            localStorage.setItem("user", JSON.stringify(data.user))
            dispatch({type:"USER",payload:data.user})
            M.toast({html:"Signed In Successfully!",classes:"#43a047 green darken-1"})
            history.push('/')
        }
    }).catch(err=>{
        console.log(err);
    })
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
            <button onClick={()=>PostData()} className="btn follow-btn" style={{lineHeight:"0rem", textTransform:"capitalize",margin:"1rem 0" }}>
                Log in
            </button>
            <h5>
                <Link to="/signup" style={{fontSize:"1rem", fontWeight:"400"}}>Don't have an account ? <span style={{color:"#0095f6"}}>Sign Up</span></Link>
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
      </>
   )
}

export default SignIn