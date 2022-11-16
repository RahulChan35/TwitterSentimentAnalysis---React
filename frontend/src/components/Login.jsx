import React,{useState} from 'react'
import '../css/Login.css'
import  ML from '../images/ml.jpg'

const Login = () => {
  const [email, setEmail]=new useState("")
  const [password, setPassword]=new useState("")

  const handleSubmit=(e)=>{
    e.preventDefault();
  }

  return (
    <div className='login-container'>
        <div className='left'><img src={ML} className="ml"/></div>
        <div className='right'>
            <h2><b>LOGIN</b></h2>
            <form onSubmit={handleSubmit}>
                <label for="email">Email: </label>
                <input type="email" id="email" name="email" placeholder='Email....' value={email} onChange={(e)=>setEmail(e.target.value)} /><br/><br/>
                <label for="password">Password: </label>
                <input type="password" id="password" name="password" placeholder='Password...' value={password} onChange={(e)=>setPassword(e.target.value)} />
            </form>
            <a href="/home"><button className="btn btn-primary btn1">LOGIN</button></a>
            <center><h4>Not Logged in?</h4></center>
            <center><a href="/Signup">Sign-Up</a></center>
            <center><p>-OR-</p></center>
            <center><a href="/Signup"><button className='btn btn-danger'>Create Account</button></a></center>
        </div>
    </div>
  )
}

export default Login
