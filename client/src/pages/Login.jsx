import React, { useContext, useState } from 'react'
import '../'
import { Link, useNavigate } from 'react-router-dom'
// import axios from 'axios'
import { AuthContext } from '../Context/authContext'
function Login() {
  const [inputs,setinputs] = useState({
    username:"",
    password:""
  })
  const [err,seterror] = useState(null)
  const nav = useNavigate()
  const {login,currentUser} = useContext(AuthContext)
  // console.log(currentUser)
  const handlechange = e=>{
    setinputs(prev=>({...prev,[e.target.name]:e.target.value }))
  } 
  const handlesubmit = async e=>{
    e.preventDefault();
    try{
    await login(inputs)
    nav("/")
    // console.log(res)
    }
    catch(err)
    {
     seterror(err.response.data)
    }
  }
  return (
    <div className='auth'><h1>Login</h1>
    
    <form action="">
      <input required type="text" placeholder='username' name="username" onChange={handlechange} />
      <input required type="password" placeholder='password' name='password' onChange={handlechange} />
      <button onClick={handlesubmit}> Login </button>
     {err && <p> {err}</p>}
      <span>Don't have an account?<Link to="/register" >Register</Link></span>
    </form>
    </div>
  )
}

export default Login