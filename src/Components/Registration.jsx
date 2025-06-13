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

  let stateCityData = [
  {
    state: "Madhya Pradesh",cities: ["Bhopal", "Indore", "Jabalpur", "Gwalior", "Ujjain"]
  },
  {
    state: "Maharashtra",cities: ["Mumbai", "Pune", "Nagpur", "Nashik", "Aurangabad"]
  },
  {
    state: "Uttar Pradesh",cities: ["Lucknow", "Kanpur", "Varanasi", "Agra", "Prayagraj"]
  },
  {
    state: "Rajasthan",cities: ["Jaipur", "Udaipur", "Jodhpur", "Ajmer", "Kota"]
  },
  {
    state: "Tamil Nadu",cities: ["Chennai", "Coimbatore", "Madurai", "Tiruchirappalli", "Salem"]
  },
  {
    state: "Karnataka",cities: ["Bengaluru", "Mysuru", "Hubli", "Mangalore", "Belgaum"]
  },
  {
    state: "Gujarat",cities: ["Ahmedabad", "Surat", "Vadodara", "Rajkot", "Gandhinagar"]
  },
  {
    state: "West Bengal",cities: ["Kolkata", "Asansol", "Siliguri", "Durgapur", "Howrah"]
  },
  {
    state: "Bihar",cities: ["Patna", "Gaya", "Muzaffarpur", "Bhagalpur", "Darbhanga"]
  },
  { 
    state: "Punjab", cities: ["Ludhiana", "Amritsar", "Jalandhar", "Patiala", "Bathinda"] 
  }
  ]

// Declaration of component states.
  let [form,setform] = useState({
    fullName:'',
    email:'',
    phone:'+91' || null,
    bloodGroup:'',
    age:18,  
    state:'',
    city:'',
    lastDonation:''
  })
  let[error,setError] = useState({})


  let selectedState = stateCityData.find(el=>el.state===form.state)
  let selectedCity = selectedState?.cities.map((city,index) =>( <option key={index} value={city}>{city}</option>))


// onChange setting [name]:values 
  function handleChange(e){
    let {name,value} = e.target
    setform((prev)=>({...prev,[name]:value}))  // form fields get set  
  }

// form validation  

function validation(){
  let newErrors = {}

  // fullname validatation 
  if(!form.fullName.trim()) {
    newErrors.fullName_err = 'name cannot be empty'
  } else if(form.fullName.length < 6 || form.fullName.length > 16){
    newErrors.fullName_err = 'name must be between 6 and 16 character'
  } 
  else{
    let spaceUsed = 0; 
    let validSpace = true;
    for(let i=0;i<form.fullName.length;i++){
      let char = form.fullName[i]
      if(char ===' '){
        spaceUsed++
        if(spaceUsed>1){
          validSpace=false
          break;
        }
      }
      if(char !==' ' && (!char >= 'A' && !char <= 'Z') && (!char >= 'a' && !char <= 'z')){
        validSpace = false;
        break;
      }
    }
    if(!validSpace){
       newErrors.fullName_err = 'name can contain only one space between name and surname'
    }
    }

    // email validation 
    if((!form.email.includes('@')) || (!form.email.endsWith('.com'))) newErrors.email_err = "invalid email format"

    // age validation 
    if(isNaN(form.age)) newErrors.age_err = "age must be a number"
    else if(form.age < 18 || form.age > 65) newErrors.age_err = "age must be in between 18-65 years old"

    // last doantion validation

    let todayDate = new Date()
    let lastDonationDate = new Date(form.lastDonation)
    if(!form.lastDonation){
      newErrors.lastDonation_err = "please provide last doantion date"
    } else if(isNaN(lastDonationDate.getTime())){
      newErrors.lastDonation_err = "invalid date format"
    } else if (lastDonationDate > todayDate) newErrors.lastDonation_err = "last donation date cannot be a future date"

    let diffInDays = (todayDate - lastDonationDate) / (1000 * 60 * 60 * 24)
    if (diffInDays < 90) {
      newErrors.lastDonation_err = "You must wait 90 days between donations"
    }
  
    setError(newErrors)  // erros has set to react_state 
    return Object.keys(newErrors).length === 0;

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
            {error.fullName_err && <p className="error">{error.fullName_err}</p>}
          </div>

          <div className="form-group">
            <label>Email ID</label>
            <input type="email" name="email" value={form.email} onChange={handleChange}  />
            {error.email_err && <p className="error">{error.email_err}</p>}
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
            <input type="number" name="age" value={form.age} onChange={handleChange} min="18" max="65" />
            {error.age_err && <p className="error">{error.age_err}</p>}
          </div>

          <div className="form-group">
           {/* Select State */}
            <select name="state" value={form.state} onChange={handleChange}>
              <option value="">-- Select State --</option>
              {/* used optional chaining for better performance*/}
              {stateCityData?.map((el,index) => (
                <option key={index} value={el.state}>{el.state}</option>
              ))}
            </select>

            {/* Select City */}
            <select name="city" value={form.city} onChange={handleChange}>
              <option value=''>Select City</option>
              {selectedCity || []}
            </select>
            
          </div>

          <div className="form-group">
            <label>Last Donation Date</label>
            <input type="date" name="lastDonation" value={form.lastDonation} onChange={handleChange} />
            {error.lastDonation_err && <p className="error">{error.lastDonation_err}</p>}
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
