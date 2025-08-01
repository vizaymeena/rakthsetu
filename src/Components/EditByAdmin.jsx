import { useParams, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios"
import { stateCityData } from "../data/staticdata"

import '../assets/styles/edituser.css'
import '../assets/styles/editBloodRequest.css'


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




import '../assets/styles/adminfilter.css'
import { useLogin } from "../contexts/LoginContext"
export let EditCamp=()=>{

  let [campForm,setCampForm] = useState({})

  let {id} = useParams()
  let navigate = useNavigate()
 
  // useEffect 
  useEffect(()=>{
    axios.get(`http://localhost:3000/camp/${id}`)
    .then(res=>setCampForm(res.data))
  },[])



  let handleChange=(e)=>{
   let{name,value}=e.target
   setCampForm(prev=> ({...prev,[name]:value}))
  }
  let handleSubmit=(e)=>{
    e.preventDefault()
    axios.put(`http://localhost:3000/camp/${id}`,campForm)

    console.log("Camp updated successfully")

    navigate(-1)
  }

  return(
    
      <div className="EditMainWrapper">
            {/* Form Section */}
            <div className="EditCampFormSection">
                <h2>Update Blood Donation Camp</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Camp Name</label>
                        <input type="text" placeholder="Enter Camp Name"
                            name='campName' value={campForm.campName || ""} onChange={handleChange} />
                    </div>

                    <div>
                        <label>Organised By</label>
                        <input type="text" placeholder="Organiser Name"
                            name='organiserName' value={campForm.organiserName || ""} onChange={handleChange} />
                    </div>

                    <div>
                        <label>Location</label>
                        <input type="text" placeholder="Venue / Location"
                            name='location' value={campForm.location || ""} onChange={handleChange} />
                    </div>

                    <div>
                        <label>State</label>
                        <input type="text" placeholder="State Name"
                            name='state' value={campForm.state || ""} onChange={handleChange} />
                    </div>

                    <div>
                        <label>City</label>
                        <input type="text" placeholder="City Name"
                            name='city' value={campForm.city || ""} onChange={handleChange} />
                    </div>

                    <div>
                        <label>Date</label>
                        <input type="date"
                            name='date' value={campForm.date || ""} onChange={handleChange} />
                    </div>

                    <div>
                        <label>Time</label>
                        <input type="time"
                            name='time' value={campForm.time || ""} onChange={handleChange} />
                    </div>

                    <div>
                        <label>Contact Number</label>
                        <input type="text" placeholder="Phone Number"
                            name='contact' value={campForm.contact || ""} onChange={handleChange} />
                    </div>

                    <div>
                        <label>Email</label>
                        <input type="email" placeholder="Email Address"
                            name='email' value={campForm.email || ""} onChange={handleChange} />
                    </div>

                    <div>
                        <label>Description</label>
                        <textarea placeholder="Write about the camp..." rows="4"
                            name='description' value={campForm.description || ""} onChange={handleChange} />
                    </div>

                    <div className="editCampButtons">
                       <button type='submit' className="EditSubmitBtn">Update Camp</button>
                       <button className="cancelBtn" onClick={()=>navigate(-1)}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>

  )

}


// Edit Blood Request 
export let EditRequest=()=>{
  let { admin } = useLogin()
  let [editRequestForm,setEditRequestForm]=useState({})
  let [cities,setCities] = useState([])
  let {id} = useParams()
  let navigate = useNavigate()
  

  useEffect(()=>{
   axios.get(`http://localhost:3000/blood_request/${id}`).then((res)=>setEditRequestForm(res.data))
  },[id])

  useEffect(()=>{
    if(!admin) return
    console.log("requestForm state:",editRequestForm.state)
    let matchedState = stateCityData?.find(el=>el.state == editRequestForm.state)
    if(!matchedState) return 
    console.log("Matched STate",matchedState)
    setCities(matchedState.cities)
  },[editRequestForm.state,id])
  


  let handleChange=(e)=>{
    let { name,value } = e.target
    setEditRequestForm((prev)=>(
      {...prev,[name]:value})
    )
  }
  let handleUpdate=(e)=>{
    e.preventDefault()
    axios.put(`http://localhost:3000/blood_request/${id}`, editRequestForm)
    navigate(-1)
  }



   return (
      <div className="editbloodRequestContainer">
        <h1 className="editformTitle">Blood Request Form</h1>
        <form className="editbloodrequestForm" onSubmit={handleUpdate}>
          
          <div className="editformRow">
            <label>Patient Name:</label>
            <input type="text" className="formInput" placeholder="Enter patient name" name="patientName" value={editRequestForm.patientName || ""} onChange={handleChange} />
          </div>
  
          <div className="editformRow">
            <label>Age:</label>
            <input type="number" className="editformInput" placeholder="Age" name="age" value={editRequestForm.age  || ""} onChange={handleChange} />
          </div>
          <div className="editformRow">
            <label>Gender:</label>
            <select name="gender" value={editRequestForm.gender  || ""} onChange={handleChange}>
              <option value="">Select</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
  
          <div className="editformRow">
            <label>Weight (kg):</label>
            <input type="number" className="editformInput" placeholder="Weight in kg" name='weight' value={editRequestForm.weight  || ""} onChange={handleChange} />
          </div>
  
          <div className="editformRow">
            <label>Blood Group:</label>
            <select className="editformInput" value={editRequestForm.bloodGroup  || ""} name="bloodGroup" onChange={handleChange}>
              <option>Select</option>
              <option>A+</option>
              <option>A-</option>
              <option>B+</option>
              <option>B-</option>
              <option>AB+</option>
              <option>AB-</option>
              <option>O+</option>
              <option>O-</option>
            </select>
          </div>
  
          <div className="editformRow">
            <label>Urgency:</label>
            <select className="editformInput" value={editRequestForm.urgency  || "" } name='urgency' onChange={handleChange}>
              <option>Select</option>
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
              <option>Critical</option>
            </select>
          </div>
  
          <div className="editformRow">
            <label>Contact:</label>
            <input type="text" className="editformInput" placeholder="Phone number" value={editRequestForm.contact  || "" } name='contact' onChange={handleChange} />
          </div>
  
          <div className="editformRow">
            <label>Hospital(at Required):</label>
            <input type="text" className="editformInput" placeholder="Hospital name" name='hospital' value={editRequestForm.hospital  || "" } onChange={handleChange} />
          </div>
  
          <div className="editformRow">
            <label>Reason:</label>
             <select className="editformInput" value={editRequestForm.reason  || "" } name='reason' onChange={handleChange}>
                <option value="">Select Reason</option>
                <option value="Surgery">Surgery</option>
                <option value="Accident">Accident / Trauma</option>
                <option value="Childbirth">Childbirth Complications</option>
                <option value="Cancer">Cancer Treatment</option>
                <option value="Anemia">Anemia</option>
                <option value="Thalassemia">Thalassemia</option>
                <option value="Hemophilia">Hemophilia</option>
                <option value="Transplant">Organ Transplant</option>
                <option value="Burn">Burn Victim</option>
                <option value="Chronic">Chronic Disease</option>
                <option value="SevereLoss">Severe Blood Loss</option>
                <option value="ICU">ICU Patient</option>
                <option value="Other">Other</option>
              </select>
          </div>
  
          <div className='editformRow'>
            <label htmlFor="">State</label>
            <select value={editRequestForm.state  || "" } name='state' onChange={handleChange}>
              <option value="">Select</option>
              {stateCityData?.map((el,key)=><option key={key}>{el.state}</option>)}
            </select>
          </div>
  
          <div className='editformRow'>
            <label htmlFor="">City</label>
            <select value={editRequestForm.city  || "" } name='city' onChange={handleChange}>
              <option value="">Select</option>
              { cities.map((el,key)=><option key={key}>{el}</option>) }
            </select>
          </div>
  
          <div className="editformRow">
            <label>Doctor's Note:</label>
            <textarea name="doctorNote" id="" rows={8} cols={80} maxLength={500} placeholder='doctor note max length 200 words' 
            value={editRequestForm.doctorNote  || "" } 
            onChange={handleChange} optional="true"></textarea>
          </div>
  
          
  
         
          <div className="editformRow">
            <button type="submit" className="editformButton">Update Request</button>
          </div>
  
        </form>
      </div>
   )
}