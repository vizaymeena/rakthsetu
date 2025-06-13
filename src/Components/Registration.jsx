import "../assets/styles/registration.css"
import React, { useState } from 'react';
import { motion } from 'framer-motion';

let Register = () => {
// Framer-Motion Animation properties
  let registerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -50 },
  }

// Declaration of component states.
  let [form,setform] = useState({
    fullName:'fullname',
    email:'example@gmail.com',
    phone:'+91' || null,
    bloodGroup:'',
    age:18,  
    location:'Delhi',
    lastDonation:''
  })
  let{error,setError}=useState({})

// onChange setting [name]:values 
  function handleChange(e){
    let {name,value} = e.target
    setform((prev)=>({...prev,[name]:value}))  // form fields get set  
  }

// form validation  

function validation(){
  let newErrors = {}

  if(!form.fullName.trim()) newErrors.fullName_err = 'name cannot be empty'

  else if(form.fullname.length<6 && form.fullname.length>16) newErrors.fullName_err = 'name must be between 6 and 16 character'

  else{
    let spaceUsed = 0;
    let validSpace = true
    for(let i=0;i<form.fullName.length;i++){
      let char = form.FullName[i]
      if(char ===' '){
        spaceUsed++
        if(spaceUsed>1){
          validSpace=false
          break;
        }
      }
      if(char!==' ' && (!char>='A' && !char<='Z') && (!char>='a' && !char<='z')){
        validSpace = false;
        break;
      }
    }
    if(!validSpace){
       newErrors.fullName_err = 'name can contain only one space between name and surname'
    }
    setError(newErrors)  // erros has set to react_state 
    return newErrors.length===0;
  }
}

// Registering the form into fake api using axios 
function handleSubmit(e){
  e.preventDefault()

  if(validation()){
    console.log('form submitted as per validation logic')
    
  }
  else{
    console.log('form fields are not upto the validation logic ')
  }
  
}






  return (
    <>
     <motion.div
      className="flex justify-center items-center min-h-screen bg-gradient-to-br from-red-100 to-white"
      variants={registerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      transition={{ duration: 0.6, ease: "easeInOut" }}
    >
    <div className="form-wrapper">
      <div className="form-container">
        <h2>Donor Registration</h2>
        <form onSubmit={handleSubmit} method="post">
          <div className="form-group">
            <label>Full Name</label>
            <input type="text" name="fullName" value={form.fullName} onChange={handleChange}  />
          </div>

          <div className="form-group">
            <label>Email ID</label>
            <input type="email" name="email" value={form.email} onChange={handleChange}  />
          </div>

          <div className="form-group">
            <label>Mobile Number</label>
            <input type="tel" name="phone" value={form.phone} onChange={handleChange}  pattern="[0-9]{10}" />
          </div>

          <div className="form-group">
            <label>Blood Group</label>
            <select name="bloodGroup" value={form.bloodGroup} onChange={handleChange} >
              <option value="">Select</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
            </select>
          </div>

          <div className="form-group">
            <label>Age</label>
            <input type="number" name="age" value={form.age} onChange={handleChange} min="18" max="65" required />
          </div>

          <div className="form-group">
            <label>City / Location</label>
            <input type="text" name="location" value={form.location} onChange={handleChange}  />
          </div>

          <div className="form-group">
            <label>Last Donation Date</label>
            <input type="date" name="lastDonation" value={form.lastDonation} onChange={handleChange} />
          </div>

          <button type="submit">Register Now</button>
        </form>
      </div>
    </div>
    </motion.div>
    </>
  );
};

export default Register
