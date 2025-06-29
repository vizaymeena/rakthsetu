import { useState } from "react"
import axios from "axios"
import "../assets/styles/login.css"
import {Link, replace, useNavigate} from 'react-router-dom'
import { useLogin } from "../contexts/LoginContext"

let Login = () => {
  let redirect = useNavigate()
  let [login,checkLogin] = useState({
    email:'',
    password:''
  })

  let { setLogin } = useLogin()

  // Admin Created 
  let admin = {
    email:'vizaymeena@gmail.com',
    password:'vizay1999'
  }
 
  // HANDLE CHANGE
  let handleChange=(e)=>{
    let {name,value} = e.target
    checkLogin(prev => ({...prev,[name]:value}))
  }
  
  let checkData = async function (email){
    try{
        let res = await axios.get(`http://localhost:3000/users?email=${email}`)
        console.log("user matched with database records" + " " + res.data[0].email)
        return res.data[0].email
    } 
    catch(error){
         console.log(`the error while checking email with the data is + ${error}`)
    }
  }  

  let handleSubmit = async (e) => {
    e.preventDefault()

    let user = await checkData(login.email)
    console.log("print this line"+ "  " + user)
    console.log()

    if(!user){
      alert("Please,register yourself first.")
      return false  // cancel if user does not match with records.
    } 


    //  admin and user into session storage
   
    try{
        // admin based login.
        if(login.email === admin.email ){
          sessionStorage.setItem('admin',admin.email)  // success session store
          setLogin(()=>({
            admin:admin.email,
            user:null
          }))
          redirect('/',{replace:true })
        }

        // user based login.
        else if(login.email === user){
          sessionStorage.setItem('user',user)  // success session store
          setLogin(()=>({
            admin:null,
            user:login.email
          }))
          redirect('/',{replace:true})
        }
    } 
    catch(error){
          console.log(`Error while logging ${error}`)
      }
  }

// logic body completed.


// template body executes...
  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login to Donate</h2>
        
        <input type="email" name="email" placeholder="Email Address" value={login.email} 
        onChange={handleChange} />

        <input type="password" name="password" placeholder="Password" value={login.password} 
        onChange={handleChange}/>

        <button type="submit">Login</button>
        <p className="signup-link">
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </form>
    </div>
  )
}

export default Login
