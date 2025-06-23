import { useState, useEffect } from "react"
import axios from "axios"

import '../assets/styles/donate.css'
import { useLogin } from "../contexts/LoginContext"
import { slide02 as image2, slide03 as image3, slide04 as image4 } from '../assets/images/donationPage'
import { stateCityData} from "../data/staticdata"
let images = [image2, image3, image4]

export let Donate = () => {

  let [form, setForm] = useState({
    name: "",
    email: "",
    gender: "",
    contact: "",
    // given below are donation details..
    age: "",
    weight:"",
    bloodGroup: "",
    state: "",
    city: "",
    lastDonationDate: "",
    surgery_illness:false,
    medical_history:false,
    consent:false
  })
  
  // custom context hooks for user login credintial
  let { admin, user } = useLogin()
  let respectiveCity = stateCityData.find((el)=> el == form.state)

// side effects
useEffect( () => {
  let emailToCheck = admin || user;
  console.log("Email to check:", emailToCheck);
  if (emailToCheck) {
    axios.get(`http://localhost:3000/users?email=${emailToCheck}`)
      .then(res => {
        console.log("Response data:", res.data);

        if (res.data.length > 0) {
          let userData = res.data[0];
          setForm(prev => ({
            ...prev,
            name: userData.fullName || "",
            email: userData.email || "",
            contact: userData.contact || "",
            gender: userData.gender || ""
          }));
          console.log("User found:", userData.fullName);
        } else {
          console.log("User not found in JSON server for this email.");
        }
      })
      .catch(err => console.log("Axios error:", err));
  }
}, [admin, user])




// Handle Change 

  let handleSubmit = (e) => {
    e.preventDefault()
    alert("Form submitted!")
  }

  let handleChange = (e) => {
    let { name, value } = e.target
    setForm({ ...form, [name]: value })
  }

  return (
    <>
    <section className="donation-page">

     <div className="hero-section">
       <h1>Donate Blood. Be a Lifesaver.</h1>
       <p>Your one donation can impact up to 3 lives. It only takes a few minutes to be a hero.</p>
     </div>

    <div className="stats-section">
      <div className="stat-card">
        <h2>428</h2>
        <p>Lives Saved</p>
      </div>
      <div className="stat-card">
        <h2>320</h2>
        <p>Total Donors</p>
      </div>
      <div className="stat-card">
        <h2>8</h2>
        <p>Active Camps</p>
      </div>
    </div>

    <div className="content-grid">
      <div className="info-section">

        <div className="card">
          <h3>Eligibility Criteria</h3>
          <ul>
            <li>Age: 18-65 years</li>
            <li>Weight: 50kg minimum</li>
            <li>No recent major illness</li>
            <li>No recent tattoos/piercings</li>
          </ul>
        </div>

        <div className="card">
          <h3>Donation Process</h3>
          <ol>
            <li>Fill the form</li>
            <li>Quick health checkup</li>
            <li>Donate (10-15 mins)</li>
            <li>Get certificate & refreshments</li>
          </ol>
        </div>

      </div>

{/* Form  */}
    <div className="form-section">
     <form onSubmit={handleSubmit}>

      <div className="formRow">
        <label>Name:</label>
        <input type="text" name="name" value={form.name}   disabled />
      </div>

      <div className="formRow">
        <label>Email:</label>
        <input type="email" name="email" value={form.email} disabled/>
      </div>

      <div className="formRow">
        <label>Gender</label>
        <select name="gender" value={form.gender} disabled>
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div className="twoColumn">
        <div className="formRow">
          <label>Age</label>
          <input type="number" min={18} max={65} placeholder="Between 18-65 years" onChange={handleChange} />
        </div>

        <div className="formRow">
          <label>Weight</label>
          <input type="number" placeholder="Min 50 kg" onChange={handleChange}/>
        </div>
      </div>

      <div className="formRow">
        <label>Blood Group</label>
        <select name="bloodGroup" value={form.bloodGroup} onChange={handleChange} >
          <option value="">Select Blood Group</option>
          {['A+','A-','B+','B-','AB+','AB-','O+','O-'].map(el=><option key={el}>{el}</option>)}
          
        </select>
      </div>

      <div className="twoColumn">
        <div className="formRow">
          <label>State</label>
          <select name="state" onChange={handleChange}>
            <option value="">Select State</option>
            {stateCityData && stateCityData.state.map((el,key)=><option key={key} value={el.state}> {el.state} </option>) }
          </select>
        </div>

        <div className="formRow">
          <label>City</label>
          <select name="city" value={form.city} onChange={handleChange}> 
            <option value="">Select City</option>
            {respectiveCity.state && respectiveCity.state.cities.map((city,key)=>{
              <option key={key} value={city}>{city}</option>}
              )}
          </select>
        </div>
      </div>

      <div className="formRow">
        <label>Last Donation</label>
        <input name="lastDonationDate" type="date" value={form.lastDonationDate} onChange={handleChange} />
      </div>

      <div className="twoColumn">
        <div className="formRow">
          <label>Recent illness or Surgery</label>
          <select name="illness_surgery" value={form.surgery_illness} onChange={handleChange}>
            <option value="no">No</option>
            <option value="yes">Yes</option>
          </select>
        </div>

        <div className="formRow">
          <label>Medical History</label>
          <select name="medical_history" value={form.medical_history} onChange={handleChange}>
            <option value="no">No</option>
            <option value="yes">Yes</option>
          </select>
        </div>
      </div>

      <div className="formRow">
        <label>Contact:</label>
        <input name="contact" type="text" placeholder="9876543210" value={form.contact} onChange={handleChange} />
      </div>

      <div className="formRow consentGroup">
        <label>
          <input name="consent" type="checkbox" value={form.consent} handleChange={handleChange} />
          I hereby provide my consent to donate blood and allow my personal information to be used for blood records and communication.
        </label>
      </div>

      {admin || user && <input type="submit" value="Register As Donor" onChange={handleChange}/>}
      
      <button type="submit" onClick={()=>alert("Please Login first")}>Register As Donor</button> 

      </form>
    </div>

    </div>

    </section>

    </>
  )
}
