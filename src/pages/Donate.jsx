import { useState, useEffect } from "react"
import axios from "axios"

import '../assets/styles/donate.css'
import { useLogin } from "../contexts/LoginContext"
import { slide02 as image2, slide03 as image3, slide04 as image4 } from '../assets/images/donationPage'
import { stateCityData } from "../data/staticdata"

let images = [image2, image3, image4]

export let Donate = () => {
  
  let [form, setForm] = useState({
    name: "Vijay Meena",
    email: "example@gmail.com",
    gender: "",
    contact: "",
    age: "",
    weight: "",
    bloodGroup: "",
    state: "",
    city: "",
    lastDonationDate: "",
    surgery_illness: 'no',
    medical_history: 'no',
    consent: false,
    active:false
  })

  let [cities, setCities] = useState([])
  let [message,setMessage] = useState({
    lastDonationDate:"",
    age:"",
    weight:"",
    consent:"",
    contact:"",
    alreadyExits:""
  })

  let { admin, user } = useLogin()


  // isDonorExists
  useEffect(()=>{

    if(!form.email) return ; // exit early base condition if email is empty
   
    let checkDonor = async () =>{
      try{
        let res = await axios.get(`http://localhost:3000/blood_donor?email=${form.email}`)
        if(res.data.length>0){
          setMessage((prev)=>({...prev,alreadyExits:"Donor already exists with this email"}))
          return 
        }
      } catch(error){
            console.log(`error is :${error}`)
      }
       setMessage((prev)=>({...prev,alreadyExits:""}))
    }
    checkDonor()
    },[form.email])


  // Fetch logged-in user data if available
  useEffect(() => {
    let emailToCheck = admin || user
    if (emailToCheck) {
      axios.get(`http://localhost:3000/users?email=${emailToCheck}`)
        .then(res => {
          if (res.data.length > 0) {
            let userData = res.data[0]
            setForm(prev => ({
              ...prev,
              name: userData.fullName || "",
              email: userData.email || "",
              contact: userData.contact || "",
              gender: userData.gender || ""
            }))
          }
        })
        .catch(err => console.log("Axios error:", err))
    }
  }, [admin, user])

  // Update cities list when state changes
  useEffect(() => {
    let selectedState = stateCityData.find(el => el.state === form.state)
    if (selectedState) {
      setCities(selectedState.cities)
    } else {
      setCities([])
    }
  }, [form.state])


  

  // Handle input changes
  let handleChange = (e) => {
    let { name, value, type, checked } = e.target
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value })
  }

  // Handle form submit
  let handleSubmit = (e) => {
    e.preventDefault()

    if(!form.age || form.age < 18 || form.age > 65){
      setMessage(prev => ({ ...prev, age: "Age must be between 18 and 65" }))
      return
    }
    
    setMessage(prev => ({ ...prev, age: "" }))

    if(!form.weight || form.weight < 50){
        setMessage(prev => ({ ...prev, weight: "Weight must be at least 50kg" }))
        return
    }

    setMessage(prev => ({ ...prev, weight: "" }))

    if(!form.lastDonationDate){
      setMessage((prev)=>({...prev,lastDonationDate:"ensure last doantion date is provided"}))
      return 
    }

    setMessage((prev)=>({...prev,lastDonationDate:""}))

    if(new Date(form.lastDonationDate) > new Date()){
      setMessage((prev)=>(
        {...prev, lastDonationDate:"last donation date cannot be a future date"}
      ))
      return 
    }

    setMessage((prev)=>({...prev,lastDonationDate:""}))

    if(!form.contact){
      setMessage((prev)=>({...prev,contact:"make sure contact information is provided"}))
      return 
    }

    setMessage((prev)=>({...prev,contact:""}))
    
    if(form.consent==false){
      setMessage((prev)=>({...prev,consent:"ensure your consent has provided"}))
      console.log("consent field of form has not been selected by the client")
      return 
    }

    setMessage((prev)=>({...prev,consent:""}))
    axios.post(`http://localhost:3000/blood_donor`,form)
    console.log('donor submitted successfully')

    setForm((prev)=>({...prev,
       name: "",
       email: "",
       gender: "",
       contact: "",
       age: "",
       weight: "",
       bloodGroup: "",
       state: "",
       city: "",
       lastDonationDate: "",
       surgery_illness: 'no',
       medical_history: 'no',
       consent: false
    }))
  }

  return (
    <>
      <section className="donation-page">
        <div className="hero-section">
          <h1>Donate Blood. Be a Lifesaver.</h1>
          <p>Your one donation can impact up to 3 lives. It only takes a few minutes to be a hero.</p>
        </div>

        <div className="stats-section">
          <div className="stat-card"><h2>428</h2><p>Lives Saved</p></div>
          <div className="stat-card"><h2>320</h2><p>Total Donors</p></div>
          <div className="stat-card"><h2>8</h2><p>Active Camps</p></div>
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

          {/* Form */}
          <div className="form-section">
            <form onSubmit={handleSubmit}>
              <div className="formRow">
                <label>Name:</label>
                <input type="text" name="name" value={form.name} disabled />
              </div>

              <div className="formRow">
                <label>Email:</label>
                <input type="email" name="email" value={form.email} disabled />
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
                  <input type="number" min={18} max={65} name="age" value={form.age} onChange={handleChange}  />
                  {message.age && <p className="errorMsg">{message.age}</p>}
                </div>

                <div className="formRow">
                  <label>Weight</label>
                  <input type="number" min={50} max={130} name="weight" value={form.weight} onChange={handleChange}  />
                   {message.weight && <p className="errorMsg">{message.weight}</p>}
                </div>
              </div>

              <div className="formRow">
                <label>Blood Group</label>
                <select name="bloodGroup" value={form.bloodGroup} onChange={handleChange}>
                  <option value="">Select Blood Group</option>
                  {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(el => (
                    <option key={el} value={el}>{el}</option>
                  ))}
                </select>
              </div>

              <div className="twoColumn">
                <div className="formRow">
                  <label>State</label>
                  <select name="state" value={form.state} onChange={handleChange}>
                    <option value="">Select State</option>
                    {stateCityData.map((el, key) => (
                      <option key={key} value={el.state}>{el.state}</option>
                    ))}
                  </select>
                </div>

                <div className="formRow">
                  <label>City</label>
                  <select name="city" value={form.city} onChange={handleChange}>
                    <option value="">Select City</option>
                    {cities.map((city, key) => (
                      <option key={key} value={city}>{city}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="formRow">
                <label>Last Donation</label>
                <input name="lastDonationDate" type="date" value={form.lastDonationDate} onChange={handleChange} />
                {message.lastDonationDate && <p className="errorMsg">{message.lastDonationDate}</p>}
              </div>

              <div className="twoColumn">
                <div className="formRow">
                  <label>Recent illness or Surgery</label>
                  <select name="surgery_illness" value={form.surgery_illness} onChange={handleChange}>
                    <option value={'no'}>No</option>
                    <option value={'yes'}>Yes</option>
                  </select>
                </div>

                <div className="formRow">
                  <label>Medical History</label>
                  <select name="medical_history" value={form.medical_history} onChange={handleChange}>
                    <option value={'no'}>No</option>
                    <option value={'yes'}>Yes</option>
                  </select>
                </div>
              </div>

              <div className="formRow">
                <label>Contact:</label>
                <input name="contact" type="text" value={form.contact} onChange={handleChange} />
                {message.contact && <p className="errorMsg">{message.contact}</p>}
              </div>

              <div className="formRow consentGroup">
                <label>
                  <input name="consent" type="checkbox" checked={form.consent} onChange={handleChange} />
                  I hereby provide my consent to donate blood and allow my personal information to be used for blood records and communication.
                </label>
                {message.consent && <p className="errorMsg">{message.consent}</p>}
              </div>
               
              {message.alreadyExits && <p className="errorMsg">{message.alreadyExits}</p>}

              {admin || user
                ? <input className="donorButton" type="submit" value="Register As Donor" />
                : <button className="donorButton" type="button" onClick={() => alert("Please Login first")}>Register As Donor</button>
              }
            </form>
          </div>
        </div>
      </section>
    </>
  )
}
