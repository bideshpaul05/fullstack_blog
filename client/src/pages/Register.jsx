import React, { useState } from 'react'
import '../'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
function Register() {
  const [inputs,setinputs] = useState({
    username:"",
    email:"",
    password:""
  })
  const [err,seterror] = useState(null)
  const nav = useNavigate()
  const handlechange = e=>{
    setinputs(prev=>({...prev,[e.target.name]:e.target.value }))
  } 
  const handlesubmit = async e=>{
    e.preventDefault();
    try{
    await axios.post("/auth/register",inputs)
    nav("/login")
    // console.log(res)
    }
    catch(err)
    {
     seterror(err.response.data)
    }
  }
  // console.log(inputs)
  return (
    <div className='auth'><h1>Register</h1>
    
    <form action="">
      <input required type="text" placeholder='username' name='username' onChange={handlechange} />
      <input required type="email" placeholder='email'name='email' onChange={handlechange} />
      <input required type="password" placeholder='password'name='password' onChange={handlechange}/>
      <button onClick={handlesubmit}> Register </button>
    { err &&  <p> {err}</p>}
      <span>Already have an account?<Link to="/login">Login</Link></span>
    </form>
    </div>
  )
}

export default Register