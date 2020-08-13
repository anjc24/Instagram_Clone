import React, {useState,useEffect,useContext} from 'react'
import {UserContext} from '../../App'
import {Link} from 'react-router-dom'


const Home = ()=>{
   const [data,setData] = useState([])
   const {state,dispatch} =useContext(UserContext)
   const[userProfile,setProfile] = useState(null)

   
   useEffect(()=>{
       fetch('/allpost',{
          headers:{
             "Authorization" : "Bearer " + localStorage.getItem("jwt")
          }
       }).then(res=>res.json())
       .then(result=>{
          console.log(result);
          setData(result.posts)
       })
   },[])

   const likePost =(id)=>{
      fetch('/like',{
         method:"put",
         headers:{
            "Content-Type":"application/json",
            "Authorization":"Bearer "+localStorage.getItem("jwt")
         },
         body:JSON.stringify({
            postId:id
         })

      }).then(res=>res.json())
      .then(result=>{
         console.log(result);
         const newData = data.map(item=>{
            if(item._id==result._id){
               return result
            }else{
               return item
            }
         })
         setData(newData)
      }).catch(err=>{
         console.log(err);
      })
   }

   const unlikePost =(id)=>{
      fetch('/unlike',{
         method:"put",
         headers:{
            "Content-Type":"application/json",
            "Authorization":"Bearer "+localStorage.getItem("jwt")
         },
         body:JSON.stringify({
            postId:id
         })

      }).then(res=>res.json())
      .then(result=>{
         console.log(result);
         const newData = data.map(item=>{
            if(item._id==result._id){
               return result
            }else{
               return item
            }
         })
         setData(newData)
      }).catch(err=>{
         console.log(err);
      })
   }

   const makeComment = (text,postId)=>{
      fetch('/comment',{
         method:"put",
         headers:{
            "Content-Type":"application/json",
            "Authorization":"Bearer " +localStorage.getItem("jwt")
         },
         body:JSON.stringify({
            postId,
            text
         })
      }).then(res=>res.json())
      .then(result=>{
         console.log(result);
         const newData = data.map(item=>{
            if(item._id==result._id){
               return result
            }else{
               return item
            }
         })
         setData(newData)
      }).catch(err=>{
         console.log(err);
      })
   }

   const deletePost = (postid)=>{
      fetch(`/deletepost/${postid}`,{
         method:"delete",
         headers:{
            Authorization:"Bearer " +localStorage.getItem("jwt")
         }
      }).then(res=>res.json())
      .then(result=>{
         console.log(result);
         const newData = data.filter(item=>{
            return item._id !==result._id
         })
         setData(newData)
      })
   }

   var saved=0;

   return(
      <div style={{margin:"0"}} className="row justify-content-center" >
      
       <div style={{padding:"0"}} className="home col-md-5 col-12  ">
            <div className="card  home-card statusbar homestatus"  id="mainstatus" style={{padding:"1rem 0rem 0 1rem",display:"flex", flexDirection:"row",overflowX:"scroll",scrollbarWidth:" none"}}>
                   <div style={{width:"4rem",textAlign:"center" ,margin:"0rem 0.5rem"}}>
                        <div className="status" style={{borderRadius:"50%"}}>
                           <img src={require('../dummy/ac.jpg')}  style={{borderRadius:"50%"}} className="status-img card-img-top " alt="..."/>
                        </div>
                     <p class="card-title" style={{fontSize:"0.8rem", fontWeight:"400",marginTop:"4px",width:"4rem"}}>_anjali.exe_</p>
                  
                  </div>
                  <div style={{width:"4rem",textAlign:"center" ,margin:"0rem 0.5rem"}}>
                        <div className="status" style={{borderRadius:"50%"}}>
                           <img  src={require('../dummy/anjc.jpg')}   style={{borderRadius:"50%"}} className="status-img card-img-top " alt="..."/>
                        </div>
                     <p class="card-title" style={{fontSize:"0.8rem", fontWeight:"400",marginTop:"4px",width:"4rem"}}>anjc24</p>
                  
                  </div>
                  <div style={{width:"4rem",textAlign:"center" ,margin:"0rem 0.5rem"}}>
                        <div className="status" style={{borderRadius:"50%"}}>
                           <img  src={require('../dummy/zuck.jpg')}   style={{borderRadius:"50%"}} className="status-img card-img-top " alt="..."/>
                        </div>
                     <p class="card-title" style={{fontSize:"0.8rem", fontWeight:"400",marginTop:"4px",width:"4rem"}}>zuck</p>
                  
                  </div>
                  <div style={{width:"4rem",textAlign:"center" ,margin:"0rem 0.5rem"}}>
                        <div className="status" style={{borderRadius:"50%"}}>
                           <img src={require('../dummy/bill.jpg')}  style={{borderRadius:"50%"}} className="status-img card-img-top " alt="..."/>
                        </div>
                     <p class="card-title" style={{fontSize:"0.8rem", fontWeight:"400",marginTop:"4px",width:"4rem"}}>bill_gates</p>
                  
                  </div>
                  <div style={{width:"4rem",textAlign:"center" ,margin:"0rem 0.5rem"}}>
                        <div className="status" style={{borderRadius:"50%"}}>
                           <img src={require('../dummy/mahi.jpg')}  style={{borderRadius:"50%"}} className="status-img card-img-top " alt="..."/>
                        </div>
                     <p class="card-title" style={{fontSize:"0.8rem", fontWeight:"400",marginTop:"4px",width:"4rem"}}>mahi7781</p>
                  
                  </div>
                  <div style={{width:"4rem",textAlign:"center" ,margin:"0rem 0.5rem"}}>
                        <div className="status" style={{borderRadius:"50%"}}>
                           <img src={require('../dummy/modi.jpg')}  style={{borderRadius:"50%"}} className="status-img card-img-top " alt="..."/>
                        </div>
                     <p class="card-title" style={{fontSize:"0.8rem", fontWeight:"400",marginTop:"4px",width:"4rem"}}>_modi_</p>
                  
                  </div>
                  <div style={{width:"4rem",textAlign:"center" ,margin:"0rem 0.5rem"}}>
                        <div className="status" style={{borderRadius:"50%"}}>
                           <img src={require('../dummy/sachin.jpg')}  style={{borderRadius:"50%"}} className="status-img card-img-top " alt="..."/>
                        </div>
                     <p class="card-title" style={{fontSize:"0.8rem", fontWeight:"400",marginTop:"4px",width:"4rem"}}>sachin_t</p>
                  
                  </div>
                  <div style={{width:"4rem",textAlign:"center" ,margin:"0rem 0.5rem"}}>
                        <div className="status" style={{borderRadius:"50%"}}>
                           <img src={require('../dummy/sonu.jpg')}  style={{borderRadius:"50%"}} className="status-img card-img-top " alt="..."/>
                        </div>
                     <p class="card-title" style={{fontSize:"0.8rem", fontWeight:"400",marginTop:"4px",width:"4rem"}}>sonu_sood</p>
                  
                  </div>
                  <div style={{width:"4rem",textAlign:"center" ,margin:"0rem 0.5rem"}}>
                        <div className="status" style={{borderRadius:"50%"}}>
                           <img src={require('../dummy/ac.jpg')}  style={{borderRadius:"50%"}} className="status-img card-img-top " alt="..."/>
                        </div>
                     <p class="card-title" style={{fontSize:"0.8rem", fontWeight:"400",marginTop:"4px",width:"4rem"}}>anjali</p>
                  
                  </div>                  
            </div>
            
          {
             
             data.map(item=>{
                return(
                  <div className="card home-card" key={item._id}>
                     <div style={{display:"flex",padding:"1rem",position:"relative"}}>
                      <img  src={item.postedBy.pic}  style={{width:"2.5rem", height:"2.5rem",borderRadius:"80px",display:"inline-block"}}/>
                        <h5 style={{paddingLeft:"1.5rem",paddingTop:"0.3rem"}}><Link style={{color:"#505050"}} to={item.postedBy._id!==state._id? "/profile/"+item.postedBy._id :"/profile/" }>{item.postedBy.email}</Link>
                       
                         </h5>
                         {item.postedBy._id==state._id && 
                        <div>
                                <i role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" className="fas fa-ellipsis-h" 
                                   style={{position:"absolute",right:"2rem",top:"1.8rem", cursor:"pointer",margin:"0"}}>
                                </i>

                              <div class="dropdown-menu" aria-labelledby="dropdownMenuLink" style={{marginLeft:"-5rem",width:"fit-content"}}>
                                 <a class="dropdown-item " id ="a" style={{color:"red  !important",width:"auto",display:"inline-block",padding:"0.8rem 0 0 1rem"}}  onClick={()=>deletePost(item._id)} href="#">Delete Post</a>
                                 <i style={{display:"inline-block"}} class="fas fa-trash"></i>
                              </div>
                        </div>
                        }
                      </div>
                        <div className="card-image">
                        {item.likes.includes(state._id)                        
                           ?
                           <img  onDoubleClick={()=>{}} src={item.photo}/>
                            :
                            <img  onDoubleClick={()=>{likePost(item._id)}} src={item.photo}/>
                        }

                           
                        </div>
                        <div className="card-content">
                         <div className="postsvg" style={{marginLeft:"-0.3rem",display:"flex",flexDirection:"row",position:"relative",marginBottom:"1rem"}}>
                           {item.likes.includes(state._id)                        
                           ?
                          <i
                           onClick={()=>{unlikePost(item._id)}}
                            className="fas fa-heart" style={{color:"#ed4956",cursor:"pointer",fontSize:"1.8rem"}}></i>
                            :
                            <i 
                            onClick={()=>{likePost(item._id)}}
                            className="far fa-heart" style={{color:"black" ,cursor:"pointer",fontSize:"1.8rem"}}></i>
                        }
                           <svg style={{margin:"0 0 0 1rem"}} aria-label="Comment" class="_8-yf5 " fill="#262626" height="24" viewBox="0 0 48 48" width="24"><path clip-rule="evenodd" d="M47.5 46.1l-2.8-11c1.8-3.3 2.8-7.1 2.8-11.1C47.5 11 37 .5 24 .5S.5 11 .5 24 11 47.5 24 47.5c4 0 7.8-1 11.1-2.8l11 2.8c.8.2 1.6-.6 1.4-1.4zm-3-22.1c0 4-1 7-2.6 10-.2.4-.3.9-.2 1.4l2.1 8.4-8.3-2.1c-.5-.1-1-.1-1.4.2-1.8 1-5.2 2.6-10 2.6-11.4 0-20.6-9.2-20.6-20.5S12.7 3.5 24 3.5 44.5 12.7 44.5 24z" fill-rule="evenodd"></path></svg>
                           <svg style={{margin:"0 0 0 1rem"}} aria-label="Share Post" class="_8-yf5 " fill="#262626" height="24" viewBox="0 0 48 48" width="24"><path d="M47.8 3.8c-.3-.5-.8-.8-1.3-.8h-45C.9 3.1.3 3.5.1 4S0 5.2.4 5.7l15.9 15.6 5.5 22.6c.1.6.6 1 1.2 1.1h.2c.5 0 1-.3 1.3-.7l23.2-39c.4-.4.4-1 .1-1.5zM5.2 6.1h35.5L18 18.7 5.2 6.1zm18.7 33.6l-4.4-18.4L42.4 8.6 23.9 39.7z"></path></svg>
                           
                           <svg style={{position:"absolute",right:"0"}} aria-label="Save" class="_8-yf5 " fill="#262626" height="24" viewBox="0 0 48 48" width="24"><path d="M43.5 48c-.4 0-.8-.2-1.1-.4L24 29 5.6 47.6c-.4.4-1.1.6-1.6.3-.6-.2-1-.8-1-1.4v-45C3 .7 3.7 0 4.5 0h39c.8 0 1.5.7 1.5 1.5v45c0 .6-.4 1.2-.9 1.4-.2.1-.4.1-.6.1zM24 26c.8 0 1.6.3 2.2.9l15.8 16V3H6v39.9l15.8-16c.6-.6 1.4-.9 2.2-.9z"></path></svg>
                           </div>
                          
                           <h6>{item.likes.length} likes</h6>
                           
                           <p style={{marginBottom:"0.5rem"}}><span style={{fontWeight:"600"}}>{item.postedBy.email } </span> {item.body}</p>
                           {
                              item.comments.map(record=>{
                                 return(
                                    <p key={record._id}><span style={{fontWeight:"600"}}>{record.postedBy.email} </span>{record.text}
                                    </p>
                                 )
                              })
                           }
                           <form onSubmit={(e)=>{
                              e.preventDefault()
                             makeComment(e.target[0].value,item._id);
                             e.target.reset();
                           }}>
                           <hr style={{margin:"1rem -1.2rem 0"}}/>
                           <input className="comment" style={{borderBottom:"none",marginBottom:"-1rem"}} type= "text" placeholder="Add a comment..." />

                           </form>
                        </div>
               </div>
             
                )
             })
          }
         
         </div>
          <div className="col-12 col-md-3 side-description" style={{top:"4rem",paddingLeft:"3rem", position:"sticky",height:"fit-content"}}>
          <div class="card sdcard" style={{width: "18rem"}}>
          <img src={state?state.pic:"loading.."} style={{width:"4rem", height:"4rem",borderRadius:"80px"}}/>

            <div class="card-body" style={{padding:"0 1.25rem"}}>
               <h5 class="card-title" style={{margin:"0.6rem 0 0 0 ",fontSize:"1rem",fontWeight:"500"}} >{state?state.email:"loading.." } </h5>
               <p class="card-text"  style={{margin:"0",fontSize:"0.8rem",fontWeight:"400",color:"grey"}}>{state?state.name:"loading.."}</p>
            </div>
         </div>
         <div style={{marginTop:"2rem",fontWeight:"500", color:"grey"}}>
            Suggestions For You
           <p style={{float:"right",color:"#000",fontSize:"0.8rem",marginRight:"6rem"}}>
              See All
           </p>
         </div>
         <div style={{marginTop:"2rem",fontWeight:"500", color:"grey"}}>
         <div class="card sdcard" style={{width: "18rem", marginTop:"-0.8rem"}}>
          <img  src={require('../dummy/zuck.jpg')} style={{width:"2.5rem", height:"2.5rem",borderRadius:"80px"}}/>

            <div class="card-body" style={{padding:"0 0.65rem"}}>
               <h5 class="card-title" style={{margin:"0 0 0 0 ",fontSize:"1rem",fontWeight:"500",color:"black"}} >Zuck </h5>
               <p class="card-text"  style={{margin:"0",fontSize:"0.8rem",fontWeight:"400",color:"grey"}}>New to Instagram</p>
            </div>
            <p style={{float:"right",color:"#2ca7f7",fontSize:"0.8rem"}}>
              Follow
           </p>
         </div>
          
         </div>
         <div style={{marginTop:"2rem",fontWeight:"500", color:"grey"}}>
         <div class="card sdcard" style={{width: "18rem", marginTop:"-0.8rem"}}>
          <img src={require('../dummy/mahi.jpg')} style={{width:"2.5rem", height:"2.5rem",borderRadius:"80px"}}/>

            <div class="card-body" style={{padding:"0 0.65rem"}}>
               <h5 class="card-title" style={{margin:"0 0 0 0 ",fontSize:"1rem",fontWeight:"500",color:"black"}} >mahi7781 </h5>
               <p class="card-text"  style={{margin:"0",fontSize:"0.8rem",fontWeight:"400",color:"grey"}}>New to Instagram</p>
            </div>
            <p style={{float:"right",color:"#2ca7f7",fontSize:"0.8rem"}}>
              Follow
           </p>
         </div>
         </div>
         <div style={{marginTop:"2rem",fontWeight:"500", color:"grey"}}>
         <div class="card sdcard" style={{width: "18rem", marginTop:"-0.8rem"}}>
          <img src={require('../dummy/bill.jpg')} style={{width:"2.5rem", height:"2.5rem",borderRadius:"80px"}}/>

            <div class="card-body" style={{padding:"0 0.65rem"}}>
               <h5 class="card-title" style={{margin:"0 0 0 0 ",fontSize:"1rem",fontWeight:"500",color:"black"}} >thisisbililgates </h5>
               <p class="card-text"  style={{margin:"0",fontSize:"0.8rem",fontWeight:"400",color:"grey"}}>New to Instagram</p>
            </div>
            <p style={{float:"right",color:"#2ca7f7",fontSize:"0.8rem"}}>
              Follow
           </p>
         </div>
         </div>
         <div style={{marginTop:"2rem",fontWeight:"500", color:"grey"}}>
         <div class="card sdcard" style={{width: "18rem", marginTop:"-0.8rem"}}>
          <img src={require('../dummy/sachin.jpg')} style={{width:"2.5rem", height:"2.5rem",borderRadius:"80px"}}/>

            <div class="card-body" style={{padding:"0 0.65rem"}}>
               <h5 class="card-title" style={{margin:"0 0 0 0 ",fontSize:"1rem",fontWeight:"500",color:"black"}} >sachin.tendulkar </h5>
               <p class="card-text"  style={{margin:"0",fontSize:"0.8rem",fontWeight:"400",color:"grey"}}>New to Instagram</p>
            </div>
            <p style={{float:"right",color:"#2ca7f7",fontSize:"0.8rem"}}>
              Follow
           </p>
         </div>
         </div>
         <div style={{marginTop:"2rem",fontWeight:"500", color:"grey"}}>
         <div class="card sdcard" style={{width: "18rem", marginTop:"-0.8rem"}}>
          <img src={require('../dummy/sonu.jpg')} style={{width:"2.5rem", height:"2.5rem",borderRadius:"80px"}}/>

            <div class="card-body" style={{padding:"0 0.65rem"}}>
               <h5 class="card-title" style={{margin:"0 0 0 0 ",fontSize:"1rem",fontWeight:"500",color:"black"}} >sonu_sood </h5>
               <p class="card-text"  style={{margin:"0",fontSize:"0.8rem",fontWeight:"400",color:"grey"}}>New to Instagram</p>
            </div>
            <p style={{float:"right",color:"#2ca7f7",fontSize:"0.8rem"}}>
              Follow
           </p>
         </div>
         </div>

         <p style={{fontSize:"0.7rem", color:"#c7c7c7",marginTop:"2rem"}} >About &#8226;Help &#8226; Press &#8226; API &#8226; Privacy &#8226; Terms&#8226; Locations 
         &#8226;<br/>Top Accounts&#8226; Hashtags&#8226; Language<br/>
         <br/>
         DEVELOPED BY ANJALI CHAUHAN
         </p>
          </div>

   </div>

   )
}

export default Home