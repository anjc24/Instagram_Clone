import React, {useState,useEffect,useContext} from 'react'
import {UserContext} from '../../App'
import {Link} from 'react-router-dom'


const Home = ()=>{
   const [data,setData] = useState([])
   const {state,dispatch} =useContext(UserContext)
   useEffect(()=>{
       fetch('/getsubpost',{
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

   

   return(
       <div className="home">
           <div className="mt-5 " >

</div>
                  {
             data.map(item=>{
                return(
                  <>
                 
            <div className="row justify-content-center " >
      
                   <div className="home col-md-5 col-12 ">
                     <div className="card home-card mb-0 " style={{margin:"0.5rem 0"}} key={item._id}>

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
             
            </div>
            </div>
                  
               </>
                )
             })
          }
          

       </div>
   )
}

export default Home