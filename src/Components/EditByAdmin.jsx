import { useParams, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios"
import '../assets/styles/edituser.css'



// edit user profile
export let EditUserProfile = () => {
  let { id } = useParams()
  let navigate = useNavigate()
  let [user, setUser] = useState(null)

  useEffect(() => {
    axios.get(`http://localhost:3000/users/${id}`)
      .then(res => setUser(res.data))
      .catch(err => console.error(err))
  }, [id])

  let handleSubmit = (updatedData) => {
    axios.put(`http://localhost:3000/users/${id}`, updatedData)
      .then(() => navigate(-1))
      .catch(err => console.error(err))
  }

  if (!user) return <p className="loading">Loading user data...</p>

  return (
    <div className="form-container">
      <h2>Edit User Profile</h2>
      <form className="edit-form" onSubmit={e => {
        e.preventDefault()
        let form = e.target
        handleSubmit({
          fullName: user.fullName.value,
          email: user.email.value,
          gender: user.gender.value,
          phone: user.phone.value,
        })
      }}>
        <div className="form-group">
          <label>Name:</label>
          <input name="fullName" defaultValue={user.fullName} />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input type="email" name="email" defaultValue={user.email} />
        </div>
        <div className="form-group">
          <label>Gender:</label>
          <select name="gender" defaultValue={user.gender}>
            <option>Male</option>
            <option>Female</option>
          </select>
        </div>
        <div className="form-group">
          <label>Phone:</label>
          <input name="phone" defaultValue={user.phone} />
        </div>
        <div className="form-actions">
          <button type="submit" className="save-btn">Save</button>
          <button type="button" className="cancel-btn" onClick={() => navigate(-1)}>Cancel</button>
        </div>
      </form>
    </div>
  )
}


import { stateCityData } from "../data/staticdata"
export let EditDonorProfile = () => {
  let [user, setUser] = useState({
    name: "",
    email: "",
    gender: "",
    age: "",
    weight: "",
    bloodGroup: "",
    state: "",
    city: "",
    lastDonationDate: "",
    surgery_illness: "no",
    medical_history: "no",
    contact: "",
  })

  let [cities, setCities] = useState([])

  let { id } = useParams()
  let navigate = useNavigate()

  // Fetch user data
  useEffect(() => {
    axios.get(`http://localhost:3000/blood_donor/${id}`)
      .then(res => setUser(res.data))
      .catch(err => console.error(err))
  }, [id])

  // Update city list when state changes
  useEffect(() => {
    console.log(user.state)
    if (user.state) {
      let matchedState = stateCityData.find(el => el.state === user.state)
       console.log(matchedState)
      setCities(matchedState?.cities)
      setUser(prev => ({ ...prev, city: "" }))  // reset city when state changes
    } else {
      setCities([])
      setUser(prev => ({ ...prev, city: "" }))
    }
    console.log(cities)
  }, [user.state])
   
  // Handle form changes
  let handleChange = (e) => {
    let { name, value } = e.target
    setUser(prev => ({ ...prev, [name]: value }))
  }
  

  function handleUpdate(e){
    e.preventDefault()
    axios.put(`http://localhost:3000/blood_donor/${id}`,user)
    .then(res=>{
      alert("Donor Updated.")
      navigate(-1,{replace:true})
    })
    .catch(err=>console.log(err))

  }


  return (
    <>
      <div className="donorForm">
        <h2 className="formTitle">Edit Donor Profile</h2>
        <form onSubmit={handleUpdate}>

          {/* Name */}
          <div className="DonorRow">
            <label>Name:</label>
            <input type="text" name="name" value={user.name} onChange={handleChange} />
          </div>

          {/* Email */}
          <div className="DonorRow">
            <label>Email:</label>
            <input type="email" name="email" value={user.email} onChange={handleChange} />
          </div>

          {/* Gender */}
          <div className="DonorRow">
            <label>Gender:</label>
            <select name="gender" value={user.gender} onChange={handleChange}>
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Age + Weight */}
          <div className="twoColumn">
            <div className="DonorRow">
              <label>Age:</label>
              <input type="number" name="age" min={18} max={65} value={user.age} onChange={handleChange} />
            </div>
            <div className="DonorRow">
              <label>Weight (kg):</label>
              <input type="number" name="weight" min={50} max={130} value={user.weight} onChange={handleChange} />
            </div>
          </div>

          {/* Blood Group */}
          <div className="DonorRow">
            <label>Blood Group:</label>
            <select name="bloodGroup" value={user.bloodGroup} onChange={handleChange}>
              <option value="">Select Blood Group</option>
              {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(bg => (
                <option key={bg} value={bg}>{bg}</option>
              ))}
            </select>
          </div>

          {/* State + City */}
          <div className="twoColumn">
            <div className="DonorRow">
              <label>State:</label>
              <select name="state" value={user.state} onChange={handleChange}>
                <option value="">Select State</option>
                {stateCityData.map(el => (
                  <option key={el.state} value={el.state}>{el.state}</option>
                ))}
              </select>
            </div>

            <div className="DonorRow">
              <label>City:</label>
              <select name="city" value={user.city} onChange={handleChange} disabled={!user.state}>
                <option value="">Select City</option>
                {cities?.map(city => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Last Donation */}
          <div className="DonorRow">
            <label>Last Donation Date:</label>
            <input type="date" name="lastDonationDate" value={user.lastDonationDate} onChange={handleChange} />
          </div>

          {/* Illness + Medical History */}
          <div className="twoColumn">
            <div className="DonorRow">
              <label>Recent illness or Surgery:</label>
              <select name="surgery_illness" value={user.surgery_illness} onChange={handleChange}>
                <option value="no">No</option>
                <option value="yes">Yes</option>
              </select>
            </div>

            <div className="DonorRow">
              <label>Medical History:</label>
              <select name="medical_history" value={user.medical_history} onChange={handleChange}>
                <option value="no">No</option>
                <option value="yes">Yes</option>
              </select>
            </div>
          </div>

          {/* Contact */}
          <div className="DonorRow">
            <label>Contact Number:</label>
            <input type="text" name="contact" value={user.contact} onChange={handleChange} />
          </div>

          <div>
          <button className="buttonUpdate" type="submit">Update</button>
          </div>

        </form>
      </div>
    </>
  )
}


