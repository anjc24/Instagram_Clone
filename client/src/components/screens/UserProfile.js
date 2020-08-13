import React,{useEffect,useState,useContext} from 'react'
import{UserContext} from '../../App'
import {useParams} from 'react-router-dom'

const Profile = ()=>{
    const[userProfile,setProfile] = useState(null)
    const{state,dispatch}=useContext(UserContext)
    const {userid} = useParams()
    const[showfollow,setShowFollow] = useState(state?!state.following.includes(userid):true)

    useEffect(()=>{
      fetch(`/user/${userid}`,{
        headers:{
            "Authorization": "Bearer "+ localStorage.getItem("jwt")
        }
      }).then(res=>res.json())
      .then(result=>
        {
            console.log(result);
            setProfile(result)
        })
    },[])

    const followUser = ()=>{
        fetch('/follow',{
            method:"put",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                followId:userid
            })
        }).then(res=>res.json())
        .then(data=>{
            dispatch({type:"UPDATE",payload:{following:data.following,followers:data.followers}})
             localStorage.setItem("user",JSON.stringify(data))
            console.log(data);
            setProfile((prevState)=>{
                return{
                    ...prevState,
                    user:{...prevState.user,
                    followers:[...prevState.user.followers,data._id]
                    }
                }
            })
            setShowFollow(false)
        })
    }

    const unfollowUser = ()=>{
        fetch('/unfollow',{
            method:"put",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                unfollowId:userid
            })
        }).then(res=>res.json())
        .then(data=>{
            dispatch({type:"UPDATE",payload:{following:data.following,followers:data.followers}})
             localStorage.setItem("user",JSON.stringify(data))
            setProfile((prevState)=>{
            const newFollower = prevState.user.followers.filter(item=>item!==data._id)

                return{
                    ...prevState,
                    user:{...prevState.user,
                    followers:newFollower
                    }
                }
            })
            setShowFollow(true)
        })
    }
   return(
       <>
       {userProfile? 

        <>





<div className="row justify-content-center" >
      
       <div className="home col-md-9 col-12  ">
           <div class="row infocard">
               
       <div class="card profilepic sdcard" style={{width: "18rem",padding:"0 10rem"}}>
          <img src={userProfile.user.pic} style={{width:"160px", height:"160px",borderRadius:"50%"}}/>

            <div class="card-body" style={{padding:"0 6rem"}}>
               <div className="username" style={{display:"flex",flexDirection:"row"}}>
               <h5  class="card-title userprofilename" style={{fontSize:"1.2rem",fontWeight:"500",color:"#262626",margin:"0.5rem 0 0.5rem 0 ",fontSize:"1.7rem",fontWeight:"300"}} >{userProfile.user.name } </h5>
              
              
                        
                        {showfollow?
                        <div className="fubox" style={{display:"flex"}}>
                             <div style={{height:"1rem",marginTop:"0.5rem",marginLeft:"1.5rem"}} className="file-field fbtn input-field">
                                    <div style={{padding:"1rem 0.5rem",boxShadow:"none",border:"1px solid #dbdbdb",height:"2rem",lineHeight:"0"}} className="btn follow-btn editprofilebtn">
                                        <span onClick={()=>followUser()}  style={{fontWeight:"600" ,textTransform:"capitalize",fontSize:"1rem",lineHeight:"0",letterSpacing:"0"}}>
                                        Follow
                                        </span>
                                    </div>
                            </div>
                            <div style={{height:"1rem",marginTop:"0.5rem",marginLeft:"0.5rem"}} className="file-field fbtn input-field">
                                    <div style={{padding:"1rem",boxShadow:"none",border:"1px solid #dbdbdb",height:"2rem",lineHeight:"0"}} className="btn caret-btn editprofilebtn">
                                        <span  style={{fontWeight:"600" ,textTransform:"capitalize",fontSize:"1rem",lineHeight:"0",letterSpacing:"0"}}>
                                        <i class="fas fa-caret-down"></i>
                                        </span>
                                    </div>
                            </div>
                         <svg style={{margin:"0.7rem 0 0 1rem"}} aria-label="Options" class="_8-yf5 " fill="#262626" height="24" viewBox="0 0 48 48" width="24"><circle clip-rule="evenodd" cx="8" cy="24" fill-rule="evenodd" r="4.5"></circle><circle clip-rule="evenodd" cx="24" cy="24" fill-rule="evenodd" r="4.5"></circle><circle clip-rule="evenodd" cx="40" cy="24" fill-rule="evenodd" r="4.5"></circle></svg>
                            
                           </div>
                            :
                            
                        <div className="fubox" style={{display:"flex"}}>
                            
                            <div style={{height:"1rem",marginTop:"0.5rem",marginLeft:"1.5rem"}} className="file-field fbtn  input-field">
                                <div style={{padding:"1rem 0.5rem",boxShadow:"none",border:"1px solid #dbdbdb",height:"2rem",lineHeight:"0"}} className="btn unfollow-btn editprofilebtn">
                                    <span onClick={()=>unfollowUser()} className="unfollowbtn" style={{fontWeight:"600" ,textTransform:"capitalize",fontSize:"1rem",lineHeight:"0",letterSpacing:"0"}}>
                                    Unfollow
                                    </span>
                                </div>
                           </div> 
                           <div style={{height:"1rem",marginTop:"0.5rem",marginLeft:"0.5rem"}} className="file-field fbtn input-field">
                                    <div style={{padding:"1rem",boxShadow:"none",border:"1px solid #dbdbdb",height:"2rem",lineHeight:"0"}} className="btn caret-btn2 editprofilebtn">
                                        <span  style={{fontWeight:"600" ,textTransform:"capitalize",fontSize:"1rem",lineHeight:"0",letterSpacing:"0"}}>
                                        <i class="fas fa-caret-down"></i>
                                        </span>
                                    </div>
                            </div>   
                          <svg style={{margin:"0.7rem 0 0 1rem"}} aria-label="Options" class="_8-yf5 " fill="#262626" height="24" viewBox="0 0 48 48" width="24"><circle clip-rule="evenodd" cx="8" cy="24" fill-rule="evenodd" r="4.5"></circle><circle clip-rule="evenodd" cx="24" cy="24" fill-rule="evenodd" r="4.5"></circle><circle clip-rule="evenodd" cx="40" cy="24" fill-rule="evenodd" r="4.5"></circle></svg>

                           </div>
                        }

     
                </div>
                
               

               <div style={{
             display:"flex", width:"108%",marginTop:"1rem"}} className="number">
                 <h6 style={{paddingLeft:"0rem" ,fontWeight:"400", fontSize:"1.2rem"}}><span style={{color:"#262626",fontWeight:"500"}}>{userProfile.posts.length}</span> posts</h6>
                 <h6 style={{paddingLeft:"2.5rem" ,fontWeight:"400", fontSize:"1.2rem"}}><span style={{color:"#262626",fontWeight:"500"}}>{userProfile.user.followers.length}</span> followers</h6>
                 <h6 style={{paddingLeft:"2.5rem" ,fontWeight:"400", fontSize:"1.2rem"}}><span style={{color:"#262626",fontWeight:"500"}}>{userProfile.user.following.length}</span> following</h6>
             </div>
             
             <div className="intro introu">
             <p class="card-text"  style={{margin:"1rem 0 0.3rem 0",fontSize:"1.2rem",fontWeight:"500",color:"#262626",width:"20rem"}}>{userProfile.user.name}</p>
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
              
              userProfile.posts.map(item=>{
                   return(
           <img style={{width:"293px",height:"293px",marginBottom:"3rem"}} key={item._id} className="item" src={item.photo} alt={item.title}/>

                   )
               })
           }
      
       </div>

       
     </div>
     </div>
    </div>
















              {/* <div style={{maxWidth:"550px", margin:"0px auto"}}>
              <div style={{
                  display:"flex",
                  justifyContent:"space-around",
                  margin:"18px 0px",
                  borderBottom:"1px solid grey"
              }}>
                  <div>
                  <img src={userProfile.user.pic} style={{width:"160px", height:"160px",borderRadius:"80px"}}/>
              </div>
              <div>
                  <h4>{userProfile.user.name}</h4>
                  <h5>{userProfile.user.email}</h5>
     
                  <div style={{
                  display:"flex", justifyContent:"space-between", width:"108%"}}>
                      <h6>{userProfile.posts.length} posts</h6>
                      <h6>{userProfile.user.followers.length} followers</h6>
                      <h6>{userProfile.user.following.length} following</h6>
                  </div>
                  {showfollow?
                   <button onClick={()=>followUser()} className="btn waves-effect waves-light #64b5f6 blue lighten-2">
                   Follow
                 </button>
                 :

                 <button onClick={()=>unfollowUser()} className="btn waves-effect waves-light #64b5f6 blue lighten-2">
                 UnFollow
               </button>
                }
                 
             </div>   
            </div>
     
            <div className="gallery">
                {
                    userProfile.posts.map(item=>{
                        return(
                <img key={item._id} className="item" src={item.photo} alt={item.title}/>
     
                        )
                    })
                }
           
            </div>
          </div> */}

          </>
       :
        <h2>loading....</h2>}

     </>
   )
}

export default Profile