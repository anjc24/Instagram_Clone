import React,{useEffect,useState,useContext} from 'react'
import{UserContext} from '../../App'

const Profile = ()=>{
    const[mypics,setPics] = useState([])
    const{state,dispatch}=useContext(UserContext)
    const [image,setImage] =useState("")
    const[userProfile,setProfile] = useState(null)
    // const [followers,setFollowers] = useState(0)
    // const [following,setFollowing] = useState(0)

    useEffect(()=>{
      fetch('/mypost',{
        headers:{
            "Authorization": "Bearer "+ localStorage.getItem("jwt")
        }
      }).then(res=>res.json())
      .then(result=>
        {
            setPics(result.mypost)
        })
    },[])


    useEffect(()=>{
         if(image){
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
                // localStorage.setItem("user",JSON.stringify({...state,pic:data.url}))
                // dispatch({type:"UPDATEPIC",payload:data.url})
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
                   console.log(result);
                   localStorage.setItem("user",JSON.stringify({...state,pic:result.pic})) 
                   dispatch({type:"UPDATEPIC",payload:result.pic})
                    window.location.reload()
                })
            })
            .catch(err=>{
                console.log(err);


            })
            
        }
         
    },[image])
    const  updatePhoto=(file)=>{
        setImage(file)        
    }
    
    const [follower,setFollower] =useState(50) 
   const getFollowers= (userid)=>{

    fetch(`/user/${userid}`,{
        headers:{
            "Authorization": "Bearer "+ localStorage.getItem("jwt")
        }
      }).then(res=>res.json())
      .then(result=>
        {
            setFollower( result.user.followers.length)

        })

       
   }
   const [following,setFollowing] =useState(50) 
   const getFollowing= (userid)=>{
    fetch(`/user/${userid}`,{
        headers:{
            "Authorization": "Bearer "+ localStorage.getItem("jwt")
        }
      }).then(res=>res.json())
      .then(result=>
        {
            setFollowing( result.user.following.length)

        })
   }
    // useEffect(()=>{
    //     setFollowers(state.followers.length)
    //     setFollowing(state.following.length)
    // },[])
   return(
       <>
       {state ?
       <div className="row justify-content-center" >
      
       <div className="home col-md-9 col-12  ">
           <div class="row infocard">
               
       <div class="card profilepic sdcard" style={{width: "18rem",padding:"0 10rem"}}>
          <img src={state?state.pic:"loading.."} style={{width:"160px", height:"160px",borderRadius:"50%"}}/>

            <div class="card-body" style={{padding:"0 6rem"}}>
               <div className="username" style={{display:"flex",flexDirection:"row"}}>
               <h5 class="card-title" style={{fontSize:"1.2rem",fontWeight:"500",color:"#262626",margin:"0.6rem 0 0.5rem 0 ",fontSize:"1.7rem",fontWeight:"300"}} >{state?state.email:"loading.." } </h5>
               <div style={{height:"1rem",marginTop:"0.5rem",marginLeft:"1.5rem"}} className="file-field  input-field">
                    <div style={{padding:"1rem 0.5rem",boxShadow:"none",border:"1px solid #dbdbdb",height:"2rem",lineHeight:"0"}} className="btn editprofilebtn">
                        <span style={{fontWeight:"600" ,textTransform:"capitalize",fontSize:"1rem",lineHeight:"0",letterSpacing:"0"}}>Edit Profile</span>
                        <input  type="file"
                        onChange={(e)=>updatePhoto(e.target.files[0])}
                        />
                    </div>
                    <div className="file-path-wrapper">
                        <input style={{width:"0px"}} className="file-path validate" type="text"/>
                    </div>
                </div> 
                <svg style={{margin:"0.7rem 0 0 0.5rem"}} aria-label="Options" class="_8-yf5 " fill="#262626" height="24" viewBox="0 0 48 48" width="24"><path clip-rule="evenodd" d="M46.7 20.6l-2.1-1.1c-.4-.2-.7-.5-.8-1-.5-1.6-1.1-3.2-1.9-4.7-.2-.4-.3-.8-.1-1.2l.8-2.3c.2-.5 0-1.1-.4-1.5l-2.9-2.9c-.4-.4-1-.5-1.5-.4l-2.3.8c-.4.1-.8.1-1.2-.1-1.4-.8-3-1.5-4.6-1.9-.4-.1-.8-.4-1-.8l-1.1-2.2c-.3-.5-.8-.8-1.3-.8h-4.1c-.6 0-1.1.3-1.3.8l-1.1 2.2c-.2.4-.5.7-1 .8-1.6.5-3.2 1.1-4.6 1.9-.4.2-.8.3-1.2.1l-2.3-.8c-.5-.2-1.1 0-1.5.4L5.9 8.8c-.4.4-.5 1-.4 1.5l.8 2.3c.1.4.1.8-.1 1.2-.8 1.5-1.5 3-1.9 4.7-.1.4-.4.8-.8 1l-2.1 1.1c-.5.3-.8.8-.8 1.3V26c0 .6.3 1.1.8 1.3l2.1 1.1c.4.2.7.5.8 1 .5 1.6 1.1 3.2 1.9 4.7.2.4.3.8.1 1.2l-.8 2.3c-.2.5 0 1.1.4 1.5L8.8 42c.4.4 1 .5 1.5.4l2.3-.8c.4-.1.8-.1 1.2.1 1.4.8 3 1.5 4.6 1.9.4.1.8.4 1 .8l1.1 2.2c.3.5.8.8 1.3.8h4.1c.6 0 1.1-.3 1.3-.8l1.1-2.2c.2-.4.5-.7 1-.8 1.6-.5 3.2-1.1 4.6-1.9.4-.2.8-.3 1.2-.1l2.3.8c.5.2 1.1 0 1.5-.4l2.9-2.9c.4-.4.5-1 .4-1.5l-.8-2.3c-.1-.4-.1-.8.1-1.2.8-1.5 1.5-3 1.9-4.7.1-.4.4-.8.8-1l2.1-1.1c.5-.3.8-.8.8-1.3v-4.1c.4-.5.1-1.1-.4-1.3zM24 41.5c-9.7 0-17.5-7.8-17.5-17.5S14.3 6.5 24 6.5 41.5 14.3 41.5 24 33.7 41.5 24 41.5z" fill-rule="evenodd"></path></svg>
                </div>
                
               

               <div style={{
             display:"flex", width:"108%",marginTop:"1rem"}} className="number">
                {getFollowing(state._id)}
                {getFollowers(state._id)}
                 <h6 style={{paddingLeft:"0rem" ,fontWeight:"400", fontSize:"1.2rem"}}><span style={{color:"#262626",fontWeight:"500"}}>{mypics.length}</span> posts</h6>
                 <h6 style={{paddingLeft:"2.5rem" ,fontWeight:"400", fontSize:"1.2rem"}}><span style={{color:"#262626",fontWeight:"500"}}>{follower}</span> followers</h6>
                 <h6 style={{paddingLeft:"2.5rem" ,fontWeight:"400", fontSize:"1.2rem"}}><span style={{color:"#262626",fontWeight:"500"}}>{following}</span> following</h6>
             </div>
             <div className="intro">
             <p class="card-text"  style={{margin:"1rem 0 0.3rem 0",fontSize:"1.2rem",fontWeight:"500",color:"#262626",width:"20rem"}}>{state?state.name:"loading.."}</p>
             <p>Graphic Designer | Web Developer</p>
             </div>
            </div>
         </div>
         </div>
       

       <div className="card  home-card statusbar "  
           style={{padding:"1rem 0rem 0 10rem",display:"flex", flexDirection:"row",overflowX:"scroll",scrollbarWidth:" none",boxShadow:"none",border:"transparent",backgroundColor:"transparent"}}
           >
                   <div className="highlights" style={{width:"6rem",textAlign:"center" ,margin:"0rem 1.5rem 0 0"}}>
                        <div className="status" style={{borderRadius:"50%",backgroundImage:"none"}}>
                           <img src={require('../dummy/travel-01-01.jpg')}  style={{borderRadius:"50%",border:"1px solid #dbdbdb",padding:"3px"}} className="status-img card-img-top " alt="..."/>
                        </div>
                     <p class="card-title" style={{fontSize:"1rem",marginLeft:"-1rem",fontWeight:"500",color:"#262626",marginTop:"4px",width:"8rem"}}>Travel</p>
                  
                  </div>
                  <div className="highlights" style={{width:"6rem",textAlign:"center" ,margin:"0rem 1.5rem"}}>
                        <div className="status" style={{borderRadius:"50%",backgroundImage:"none"}}>
                           <img  src={require('../dummy/food-01-01.jpg')}   style={{borderRadius:"50%",border:"1px solid #dbdbdb",padding:"3px"}} className="status-img card-img-top " alt="..."/>
                        </div>
                     <p class="card-title" style={{fontSize:"1rem",marginLeft:"-1rem",fontWeight:"500",color:"#262626",marginTop:"4px",width:"8rem"}}>Food</p>
                  
                  </div>
                  <div className="highlights" style={{width:"6rem",textAlign:"center" ,margin:"0rem 1.5rem"}}>
                        <div className="status" style={{borderRadius:"50%",backgroundImage:"none"}}>
                           <img  src={require('../dummy/shots-01.jpg')}   style={{borderRadius:"50%",border:"1px solid #dbdbdb",padding:"3px"}} className="status-img card-img-top " alt="..."/>
                        </div>
                     <p class="card-title" style={{fontSize:"1rem",marginLeft:"-1rem",fontWeight:"500",color:"#262626",marginTop:"4px",width:"8rem"}}>Shots</p>
                  
                  </div>
                  <div className="highlights" style={{width:"6rem",textAlign:"center" ,margin:"0rem 1.5rem"}}>
                        <div className="status" style={{borderRadius:"50%",backgroundImage:"none"}}>
                           <img src={require('../dummy/clips-01.jpg')}  style={{borderRadius:"50%",border:"1px solid #dbdbdb",padding:"3px"}} className="status-img card-img-top " alt="..."/>
                        </div>
                     <p class="card-title" style={{fontSize:"1rem",marginLeft:"-1rem",fontWeight:"500",color:"#262626",marginTop:"4px",width:"8rem"}}>Clips</p>
                  
                  </div>
                  <div className="highlights" style={{width:"6rem",textAlign:"center" ,margin:"0rem 1.5rem"}}>
                        <div className="status" style={{borderRadius:"50%",backgroundImage:"none"}}>
                           <img src={require('../dummy/outdoors-01.jpg')}  style={{borderRadius:"50%",border:"1px solid #dbdbdb",padding:"3px"}} className="status-img card-img-top " alt="..."/>
                        </div>
                     <p class="card-title" style={{fontSize:"1rem",marginLeft:"-1rem",fontWeight:"500",color:"#262626",marginTop:"4px",width:"8rem"}}>Outdoors</p>
                  
                  </div>
                  <div className="highlights" style={{width:"6rem",textAlign:"center" ,margin:"0rem 1.5rem"}}>
                        <div className="status" style={{borderRadius:"50%",backgroundImage:"none"}}>
                           <img src={require('../dummy/books-01.jpg')}  style={{borderRadius:"50%",border:"1px solid #dbdbdb",padding:"3px"}} className="status-img card-img-top " alt="..."/>
                        </div>
                     <p class="card-title" style={{fontSize:"1rem",marginLeft:"-1rem",fontWeight:"500",color:"#262626",marginTop:"4px",width:"8rem"}}>Books</p>
                  
                  </div>
                  <div className="highlights" style={{width:"6rem",textAlign:"center" ,margin:"0rem 1.5rem"}}>
                        <div className="status" style={{borderRadius:"50%",backgroundImage:"none"}}>
                           <img src={require('../dummy/music-01.jpg')}  style={{borderRadius:"50%",border:"1px solid #dbdbdb",padding:"3px"}} className="status-img card-img-top " alt="..."/>
                        </div>
                     <p class="card-title" style={{fontSize:"1rem",marginLeft:"-1rem",fontWeight:"500",color:"#262626",marginTop:"4px",width:"8rem"}}>Music</p>
                  
                  </div>
                                  
            </div>


            <div style={{ margin:"0px auto"}}>
         <div className="hr" style={{
             justifyContent:"space-around",
             margin:"18px 0px",
             borderBottom:"1px solid #dbdbdb"
         }}>
        
       </div>
       <div className="card  home-card statusbar "  
           style={{marginBottom:"0.2rem",marginTop:"0.2rem",padding:"0 18rem",display:"flex", flexDirection:"row",justifyContent:"space-around",boxShadow:"none",border:"transparent",backgroundColor:"transparent"}}
           >
               <p style={{fontWeight:"600",fontSize:"0.9rem"}}>
               <svg  aria-label="Posts" class="_8-yf5 " fill="#262626" height="12" viewBox="0 0 48 48" width="12"><path clip-rule="evenodd" d="M45 1.5H3c-.8 0-1.5.7-1.5 1.5v42c0 .8.7 1.5 1.5 1.5h42c.8 0 1.5-.7 1.5-1.5V3c0-.8-.7-1.5-1.5-1.5zm-40.5 3h11v11h-11v-11zm0 14h11v11h-11v-11zm11 25h-11v-11h11v11zm14 0h-11v-11h11v11zm0-14h-11v-11h11v11zm0-14h-11v-11h11v11zm14 28h-11v-11h11v11zm0-14h-11v-11h11v11zm0-14h-11v-11h11v11z" fill-rule="evenodd"></path></svg>
               &nbsp; &nbsp; POSTS
               </p>
               <p style={{fontWeight:"600",fontSize:"0.9rem",color:"#8e8e8e"}}>
               <svg aria-label="Posts" class="_8-yf5 " fill="#8e8e8e" height="12" viewBox="0 0 48 48" width="12"><path d="M41 10c-2.2-2.1-4.8-3.5-10.4-3.5h-3.3L30.5 3c.6-.6.5-1.6-.1-2.1-.6-.6-1.6-.5-2.1.1L24 5.6 19.7 1c-.6-.6-1.5-.6-2.1-.1-.6.6-.7 1.5-.1 2.1l3.2 3.5h-3.3C11.8 6.5 9.2 7.9 7 10c-2.1 2.2-3.5 4.8-3.5 10.4v13.1c0 5.7 1.4 8.3 3.5 10.5 2.2 2.1 4.8 3.5 10.4 3.5h13.1c5.7 0 8.3-1.4 10.5-3.5 2.1-2.2 3.5-4.8 3.5-10.4V20.5c0-5.7-1.4-8.3-3.5-10.5zm.5 23.6c0 5.2-1.3 7-2.6 8.3-1.4 1.3-3.2 2.6-8.4 2.6H17.4c-5.2 0-7-1.3-8.3-2.6-1.3-1.4-2.6-3.2-2.6-8.4v-13c0-5.2 1.3-7 2.6-8.3 1.4-1.3 3.2-2.6 8.4-2.6h13.1c5.2 0 7 1.3 8.3 2.6 1.3 1.4 2.6 3.2 2.6 8.4v13zM34.6 25l-9.1 2.8v-3.7c0-.5-.2-.9-.6-1.2-.4-.3-.9-.4-1.3-.2l-11.1 3.4c-.8.2-1.2 1.1-1 1.9.2.8 1.1 1.2 1.9 1l9.1-2.8v3.7c0 .5.2.9.6 1.2.3.2.6.3.9.3.1 0 .3 0 .4-.1l11.1-3.4c.8-.2 1.2-1.1 1-1.9s-1.1-1.2-1.9-1z"></path></svg>
               &nbsp;  &nbsp;IGTV
               </p>
               <p style={{fontWeight:"600",fontSize:"0.9rem",color:"#8e8e8e"}}>
               <svg aria-label="Saved" class="_8-yf5 " fill="#8e8e8e" height="12" viewBox="0 0 48 48" width="12"><path d="M43.5 48c-.4 0-.8-.2-1.1-.4L24 29 5.6 47.6c-.4.4-1.1.6-1.6.3-.6-.2-1-.8-1-1.4v-45C3 .7 3.7 0 4.5 0h39c.8 0 1.5.7 1.5 1.5v45c0 .6-.4 1.2-.9 1.4-.2.1-.4.1-.6.1zM24 26c.8 0 1.6.3 2.2.9l15.8 16V3H6v39.9l15.8-16c.6-.6 1.4-.9 2.2-.9z"></path></svg>
               &nbsp; &nbsp;SAVED
               </p>
               <p style={{fontWeight:"600",fontSize:"0.9rem",color:"#8e8e8e"}}>
               <svg aria-label="Tagged" class="_8-yf5 " fill="#8e8e8e" height="12" viewBox="0 0 48 48" width="12"><path d="M41.5 5.5H30.4c-.5 0-1-.2-1.4-.6l-4-4c-.6-.6-1.5-.6-2.1 0l-4 4c-.4.4-.9.6-1.4.6h-11c-3.3 0-6 2.7-6 6v30c0 3.3 2.7 6 6 6h35c3.3 0 6-2.7 6-6v-30c0-3.3-2.7-6-6-6zm-29.4 39c-.6 0-1.1-.6-1-1.2.7-3.2 3.5-5.6 6.8-5.6h12c3.4 0 6.2 2.4 6.8 5.6.1.6-.4 1.2-1 1.2H12.1zm32.4-3c0 1.7-1.3 3-3 3h-.6c-.5 0-.9-.4-1-.9-.6-5-4.8-8.9-9.9-8.9H18c-5.1 0-9.4 3.9-9.9 8.9-.1.5-.5.9-1 .9h-.6c-1.7 0-3-1.3-3-3v-30c0-1.7 1.3-3 3-3h11.1c1.3 0 2.6-.5 3.5-1.5L24 4.1 26.9 7c.9.9 2.2 1.5 3.5 1.5h11.1c1.7 0 3 1.3 3 3v30zM24 12.5c-5.3 0-9.6 4.3-9.6 9.6s4.3 9.6 9.6 9.6 9.6-4.3 9.6-9.6-4.3-9.6-9.6-9.6zm0 16.1c-3.6 0-6.6-2.9-6.6-6.6 0-3.6 2.9-6.6 6.6-6.6s6.6 2.9 6.6 6.6c0 3.6-3 6.6-6.6 6.6z"></path></svg>
               &nbsp; &nbsp;TAGGED
               </p>
        </div>


       <div className="gallery" style={{padding:"0 5rem"}}>
           {
              
               mypics.map(item=>{
                   return(
           <img style={{width:"293px",height:"293px",marginBottom:"2.2rem"}} key={item._id} className="item" src={item.photo} alt={item.title}/>

                   )
               })
           }
      
       </div>
     </div>
     </div>
    </div>
     :
     <h5>loading...</h5>
        }
     </>
   )
}

export default Profile