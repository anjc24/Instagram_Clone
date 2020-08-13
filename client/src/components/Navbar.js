import React,{useContext,useRef,useEffect,useState} from 'react'
import {Link ,useHistory} from 'react-router-dom'
import {UserContext} from '../App'
import M from 'materialize-css'

const NavBar = ()=>{
    const searchModal = useRef(null)
    const [search,setSearch] = useState('')
    const [userDetails,setUserDetails]= useState([])
    const {state, dispatch} = useContext(UserContext)
    const history= useHistory()
    useEffect(()=>{
       M.Modal.init(searchModal.current)
    },[])
    const renderList = () =>{
        if(state){
            return[
               
                <li className="searchbox"> <input data-target="modal1" className="serachusers modal-trigger form-control form-inline" type="search" placeholder="Search" aria-label="Search" style={{marginTop:"-0.2rem" ,border:"1px solid #e6e7e8", height:"2rem",marginRight:"10vw",width:"15rem",backgroundColor:"#fafafa",borderRadius:"3px"}}/></li>,
                <li><Link  to="/" style={{height:"1.6rem"}} className="searchmob"><a data-target="modal1" className="modal-trigger form-control form-inline" type="search"><i  class="fas fa-search"></i></a></Link></li>,     
                <li><Link to="/"><svg aria-label="Home" className="_8-yf5 " fill="#262626" height="22" viewBox="0 0 48 48" width="22"><path d="M45.5 48H30.1c-.8 0-1.5-.7-1.5-1.5V34.2c0-2.6-2.1-4.6-4.6-4.6s-4.6 2.1-4.6 4.6v12.3c0 .8-.7 1.5-1.5 1.5H2.5c-.8 0-1.5-.7-1.5-1.5V23c0-.4.2-.8.4-1.1L22.9.4c.6-.6 1.6-.6 2.1 0l21.5 21.5c.3.3.4.7.4 1.1v23.5c.1.8-.6 1.5-1.4 1.5z"></path></svg></Link></li>,
                <li><svg aria-label="Direct" className="_8-yf5 " fill="#262626" height="22" viewBox="0 0 48 48" width="22"><path d="M47.8 3.8c-.3-.5-.8-.8-1.3-.8h-45C.9 3.1.3 3.5.1 4S0 5.2.4 5.7l15.9 15.6 5.5 22.6c.1.6.6 1 1.2 1.1h.2c.5 0 1-.3 1.3-.7l23.2-39c.4-.4.4-1 .1-1.5zM5.2 6.1h35.5L18 18.7 5.2 6.1zm18.7 33.6l-4.4-18.4L42.4 8.6 23.9 39.7z"></path></svg></li>,
                <li><Link to="/myfollowingpost"><svg aria-label="Find People" className="_8-yf5 " fill="#262626" height="22" viewBox="0 0 48 48" width="22"><path clip-rule="evenodd" d="M24 0C10.8 0 0 10.8 0 24s10.8 24 24 24 24-10.8 24-24S37.2 0 24 0zm0 45C12.4 45 3 35.6 3 24S12.4 3 24 3s21 9.4 21 21-9.4 21-21 21zm10.2-33.2l-14.8 7c-.3.1-.6.4-.7.7l-7 14.8c-.3.6-.2 1.3.3 1.7.3.3.7.4 1.1.4.2 0 .4 0 .6-.1l14.8-7c.3-.1.6-.4.7-.7l7-14.8c.3-.6.2-1.3-.3-1.7-.4-.5-1.1-.6-1.7-.3zm-7.4 15l-5.5-5.5 10.5-5-5 10.5z" fill-rule="evenodd"></path></svg></Link></li>,
                <li><svg aria-label="Activity Feed" className="_8-yf5 " fill="#262626" height="22" viewBox="0 0 48 48" width="22"><path d="M34.6 6.1c5.7 0 10.4 5.2 10.4 11.5 0 6.8-5.9 11-11.5 16S25 41.3 24 41.9c-1.1-.7-4.7-4-9.5-8.3-5.7-5-11.5-9.2-11.5-16C3 11.3 7.7 6.1 13.4 6.1c4.2 0 6.5 2 8.1 4.3 1.9 2.6 2.2 3.9 2.5 3.9.3 0 .6-1.3 2.5-3.9 1.6-2.3 3.9-4.3 8.1-4.3m0-3c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5.6 0 1.1-.2 1.6-.5 1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path></svg></li>,
                
                    <li className="" data-container="body" data-toggle="popover" data-placement="left" data-content="Vivamus sagittis lacus vel augue laoreet rutrum faucibus.">
               {/* <button type="button" className="btn btn-secondary" >
  Popover on left
</button> */}
                        <div style={{cursor:"pointer"}} className=" dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <img src={state?state.pic:"loading.."} style={{width:"25px",marginLeft:"1rem",marginTop:"-0.1rem", height:"25px",borderRadius:"80px"}}/>
                        </div>
                        <div className="dropdown-menu profile-dropdown">
                            <ul>
                            <Link  to="/profile"> <a className="dropdown-item" href="#"><i className="far fa-user-circle"></i>Profile</a></Link>
                            <Link to="/create"><a className="dropdown-item" href="#"><i className="far fa-plus-square"></i>New Post</a></Link>
                            <Link ><a className="dropdown-item" href="#"><i className="far fa-bookmark"></i>Saved</a></Link>
                            <Link ><a className="dropdown-item" href="#"><i className="fas fa-cog"></i>Settings</a></Link>
                            
                            <Link><a className="dropdown-item" style={{ paddingLeft:"1.5rem",paddingBottom:"2rem"}} onClick={()=>{
                    localStorage.clear()
                    dispatch({type:"CLEAR"})
                    history.push('/signin')}} href="#">Log Out</a></Link>

                        
                            </ul>
                        </div>
                    </li>,


            ]
        }else{
            return[
                <li><Link to="/signin">Signin</Link></li>,
                <li><Link to="/signup">Signup</Link></li>
            ]
        }
    }


        const fetchUsers = (query) =>{
           setSearch(query)
           fetch('/search-users',{
               method:"post",
               headers:{
                   "Content-Type":"application/json"
               },
              body:JSON.stringify({
                    query
            })
           }).then(res=>res.json())
           .then(results=>{
               setUserDetails(results.user)
           })
        }

    return(
        <>




        <nav style={{WebkitBoxShadow:"none",borderBottom:"1px solid #e5e5e5",visibility:state?"visible":"hidden"}} >
            <div className="nav-wrapper white">
                <Link to={state?"/":"/signin"}  className="brand-logo left ">Instagram</Link>
                <ul id="nav-mobile" className="right">
                  {renderList()}
               
                </ul>
            </div>
            <div id="modal1" className="modal" ref={searchModal} style={{width:"30vw",height:"auto"}}>
                    <div className="modal-content" style={{color:"black"}}>
                    <input
                    type="text"
                    placeholder="search users"
                    value={search}
                    onChange={(e)=>fetchUsers(e.target.value)}
                    />
                    <ul className="collection" style={{display:"flex",flexDirection:"column"}}>
                        {userDetails.map(item=>{
                        
                        return <Link to={item._id!=state._id ?"profile/" + item._id:'/profile'} onClick={()=>{ 
                            M.Modal.getInstance(searchModal.current).close()
                            setSearch('')
                            }}><li className="collection-item">
                            <div class="card sdcard" style={{width: "18rem", marginTop:"1rem"}}>
                                <img src={item.pic} style={{width:"2.5rem", height:"2.5rem",borderRadius:"80px"}}/>

                                    <div class="card-body" style={{padding:"0 0.65rem"}}>
                                    <h5 class="card-title" style={{margin:"0 0 0 0 ",fontSize:"1rem",fontWeight:"500",color:"black"}} >{item.email} </h5>
                                    <p class="card-text"  style={{margin:"0",fontSize:"0.8rem",fontWeight:"400",color:"grey"}}>{item.name}</p>
                                    </div>
                                    
                                </div>
                            </li></Link>                      
                        })}
                       
                    </ul>
                    </div>
                    <div className="modal-footer" style={{position:"sticky",bottom:"0"}}>
                    <button className="modal-close waves-effect waves-grey btn-flat" onClick={()=>setSearch('')}>Close</button>
                    </div>
                     </div>
        </nav>
        </>
    )
}

export default NavBar