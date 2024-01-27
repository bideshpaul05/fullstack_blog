import React, { useContext, useEffect, useState } from 'react'
import Delete from '../images/delete.png'
import Edit from '../images/edit.png'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Menu from '../Components/Menu'
import moment from "moment"
import { AuthContext } from '../Context/authContext'
import axios from 'axios'
// import 
function Single() {
  const {currentUser} = useContext(AuthContext)
  const [post, setPost] = useState({});
  const id = useLocation().pathname.split("/")[2]
  console.log(id)
  const navigate = useNavigate()
  useEffect(()=>{
    const fetchdata = async()=>{
      try{

        const res = await axios.get(`/posts/${id}`);
        console.log(res)
        setPost(res.data)
      }
      catch(err)
      {
        console.log(err)
      }
    }
    fetchdata()
  },[id])
  const handledelete = async ()=>{
    try{
      await axios.delete(`/posts/${id}`)
      navigate("/");
    }
    catch(err)
    {
      console.log(err)
    }
  }
  const handleupdate = async()=>{

  }

  
  return (
    <div className="single">
    <div className="content">
      <img src={`../upload/${post?.img}`} alt="" />
      <div className="user">
      { post.image &&  <img
          src={`../upload/${post?.img}`}
          alt=""
        />}
        <div className="info">
          <span>{post.username}</span>
          <p>Posted {moment((post.date)).fromNow()}</p>
        </div>
       
       {  currentUser && currentUser.username ==  post.username && 
       <div className="edit">
            <Link to={`/write?edit=${id}`} state={post} >
              <img src={Edit}  alt="" />
            </Link>
            <img src={Delete} onClick={handledelete} alt="" />
          </div>
           } 
        
      </div>
      <h1>{post.title}</h1>
      <p>{post.desc}</p>      </div>
    <Menu cat = {post.cat}/>
  </div>
  )
}

export default Single