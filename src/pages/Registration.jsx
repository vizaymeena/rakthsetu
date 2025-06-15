import "../assets/styles/registration.css"
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { stateCityData } from "../data/staticStateCity.jsx"  // state and relative city for donar registration
import axios from 'axios'
import { validation } from "../utlis/validateDonorForm.js.jsx"

let Register = () => {
// Framer-Motion Animation properties
  let registerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -50 },
  }

// Declaration of component states.
  let [form,setform] = useState({
    fullName:'',
    email:'',
    phone: '',
    bloodGroup:'',
    age:18,  
    state:'',
    city:'',
    lastDonation:'',
    profilePic:''
  })
  let[error,setError] = useState({})


  let selectedState = stateCityData.find(el=>el.state===form.state)
  let selectedCity = selectedState?.cities.map((city,index) =>( <option key={index} value={city}>{city}</option>))


// onChange setting [name]:values 
 function handleChange(e) {
  let { name, value, type, files } = e.target;

  if (type === 'file') {
    let file = files[0];

    if (file) {
      let reader = new FileReader();

      reader.onloadend = () => {
        let base64String = reader.result
        setform(prev => ({
          ...prev,
          profilePic: base64String,
        }))
      }
      reader.readAsDataURL(file)
    }
  } else {
    setform(prev => ({
      ...prev,
      [name]: value,
    }));
  }
}




// Registering the form into fake api using axios 
function handleSubmit(e){
  e.preventDefault()
//3. called post and submit to json
  let checkEmailExist= async(email)=>{
    await axios.get(`http://localhost:3000/users?email=${email}`)
    .then(res=> {
        let alreadyExist = `Email ${res.data} already exists.`
        return alreadyExist
    })
  }

  let Post= async()=>{
     await axios.post(`http://localhost:3000/users`,form)
      .then((res)=> console.log(res.data))
      .catch((err)=> console.log(err))
  }
  const newError = validation(form)  // returned via validation func.
  setError(newError)
//1. If all ok
  if(Object.keys(newError).length == 0){
    
    if(checkEmailExist()){
      alert("email already exists")
      return;
    } 
    else{
        Post() //2. Call post
        console.log('Form successfully submitted')
    }
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
           <label htmlFor="">State</label>
            <select name="state" value={form.state} onChange={handleChange}>
              <option value="">-- Select State --</option>
              {/* used optional chaining for better performance*/}
              {stateCityData?.map((el,index) => (
                <option key={index} value={el.state}>{el.state}</option>
              ))}
            </select>

            {/* Select City */}
            <label htmlFor="">City</label>
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

          <div>
            <label htmlFor="">Profile Pic</label>
            <input type="file" name="profilePic" accept="image/png, image/jpeg" onChange={handleChange} />
          </div>
          {form.profilePic && (
          <img src={form.profilePic} alt="Preview" style={{ width: '100px' }} />
          )}

          <button type="submit">Register Now</button>
        </form>
      </div>
    </div>
    </motion.div>
    </>
  );
};

export default Register
