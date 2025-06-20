import "../assets/styles/registration.css"
import { useEffect, useState } from 'react'
import { validation } from "../utlis/validation"
import axios from 'axios'
let Register = () => {

  let [form, setForm] = useState({
    name: "",
    email: "",
    gender: "",
    contact: "",
    password: "",
    confirmPassword: ""
  })
  let [error,setError] = useState({})

  // user saved credential
  const context = {
    name:form.name,
    email:form.email,
    gender:form.gender,
    contact:form.contact,
    password:form.password
  }
  
    
  // EVENT HANDLER
  let handleChange=(e)=>{
    let {name,value} = e.target
    setForm(prev=>({
      ...prev,[name]:value
    }))
  }

  let handleSubmit=async(e)=>{
    e.preventDefault()
    
    try{
      let valError = validation(form);
      setError(valError);
      let hasError = Object.values(error).filter(val => val !== null);

      if (hasError.length !== 0){
       console.log(`Printing has error : ${hasError}`);
       return console.log("validation error");
      }


      // Check for duplicate email
      let isEmailExist = async (email)=>{
        let res = await axios.get(`http://localhost:3000/users?email=${email}`)
        return res.data
      }
      let alreadyUser = await isEmailExist(form.email)
      if(alreadyUser.length>0){
        setError(prev => ({
          ...prev,email:'email already exist'
        }))
        return false;
      }

      // duplicate check positive
      setError(prev=>({
        ...prev,email:null
      }))
      // post data
      axios.post(`http://localhost:3000/users`,context)
      alert("Successfully registered")
      return true
    } 
    catch(error){
      console.log(error)
    }
    
  } 


 
 





  return (
  <>
    <div className="registerContainer">
      <h2>Register Account</h2>

      <form onSubmit={handleSubmit} className="registerForm">
        <input className="input" type="text" 
        placeholder="Full Name"  name="name" onChange={handleChange} value={form.name} />

        <input className="input"  type="text" 
        placeholder="Email Address"  name="email" onChange={handleChange} value={form.email} />
        
        <select className="input"  name="gender" onChange={handleChange} value={form.gender}>
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>

        <input className="input"  type="text" 
        placeholder="Contact Number" name="contact" onChange={handleChange} value={form.contact}/>

        <input className="input"  type="text" 
        placeholder="Password" name="password" onChange={handleChange} value={form.password} />

        <input className="input"  type="text" 
        placeholder="Confirm Password" name="confirmPassword" onChange={handleChange} value={form.confirmPassword} />


        <button className="registerBtn" type="submit" >Register</button>
      </form>
    </div>
    </>
  )
 }
export default Register
