import { useEffect, useState } from "react"
import { stateCityData } from "../data/staticdata"
import axios from "axios"
import { useLocation , useNavigate } from "react-router-dom"
import '../assets/styles/bloodrequest.css'
export let EditBloodRequest=()=>{
    let [updateForm , setUpdateForm] = useState({})
    let location = useLocation()
    let navigate = useNavigate()
    let id = location.state?.editIndex

    console.log("id",id)
    let cities = stateCityData.filter((el)=>el.state == updateForm.state)

    useEffect(()=>{
        axios.get(`http://localhost:3000/blood_request/${id}`)
        .then((res)=> setUpdateForm((res.data)))
    },[id])

    console.log("from fetch by id ",updateForm)

    let handleChange=(e)=>{
        let {name,value} = e.target
        setUpdateForm((prev)=>({
            ...prev,[name]:value
        }))

    }

    let handleSubmit=(e)=>{
        e.preventDefault()
        axios.put(`http://localhost:3000/blood_request/${id}`,updateForm)
                navigate(-1)

        alert("details successfully updated")
    }
    
    return(
        <>
        <div className="userBloodRequestContainer">
              <h1 className="userFormTitle">Update Blood Request</h1>
              <form className="userBloodupdateForm" onSubmit={handleSubmit}>
                
                <div className="userFormRow">
                  <label>Patient Name:</label>
                  <input type="text" className="userFormInput" placeholder="Enter patient name" name="patientName" value={updateForm.patientName || ""} onChange={handleChange} />
                </div>
        
                <div className="userFormRow">
                  <label>Age:</label>
                  <input type="number" className="userFormInput" placeholder="Age" name="age" value={updateForm.age || ""} onChange={handleChange} />
                </div>
                <div className="userFormRow">
                  <label>Gender:</label>
                  <select name="gender" value={updateForm.gender || ""} onChange={handleChange}>
                    <option value="">Select</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
        
                <div className="userFormRow">
                  <label>Weight (kg):</label>
                  <input type="number" className="userFormInput" placeholder="Weight in kg" name='weight' value={updateForm.weight || ""} onChange={handleChange} />
                </div>
        
                <div className="userFormRow">
                  <label>Blood Group:</label>
                  <select className="userFormInput" value={updateForm.bloodGroup || ""} name="bloodGroup" onChange={handleChange}>
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
        
                <div className="userFormRow">
                  <label>Urgency:</label>
                  <select className="userFormInput" value={updateForm.urgency || ""} name='urgency' onChange={handleChange}>
                    <option>Select</option>
                    <option>Low</option>
                    <option>Medium</option>
                    <option>High</option>
                    <option>Critical</option>
                  </select>
                </div>
        
                <div className="userFormRow">
                  <label>Contact:</label>
                  <input type="text" className="userFormInput" placeholder="Phone number" value={updateForm.contact || ""} name='contact' onChange={handleChange} />
                </div>
        
                <div className="userFormRow">
                  <label>Hospital(at Required):</label>
                  <input type="text" className="userFormInput" placeholder="Hospital name" name='hospital' value={updateForm.hospital || ""} onChange={handleChange} />
                </div>
        
                <div className="userFormRow">
                  <label>Reason:</label>
                   <select className="userFormInput" value={updateForm.reason || ""} name='reason' onChange={handleChange}>
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
        
                <div className='userFormRow'>
                  <label htmlFor="">State</label>
                  <select value={updateForm.state || ""} name='state' onChange={handleChange}>
                    <option value="">Select</option>
                    {stateCityData?.map((el,key)=><option key={key}>{el.state}</option>)}
                  </select>
                </div>
        
                <div className='userFormRow'>
                  <label htmlFor="">City</label>
                  <select value={updateForm.city || ""} name='city' onChange={handleChange}>
                    <option value="">Select</option>
                    {cities.map((el,key)=><option key={key}>{el}</option>)}
                  </select>
                </div>
        
                <div className="userFormRow">
                  <label>Doctor's Note:</label>
                  <textarea name="doctorNote" id="" rows={8} cols={80} maxLength={500} placeholder='doctor note max length 200 words' 
                  value={updateForm.doctorNote || ""} 
                  onChange={handleChange} optional="true"></textarea>
                </div>
        
                
        
               
                <div className="userFormRow">
                  <button type="submit" className="formButton">Update Request</button>
                </div>
        
              </form>
            </div>
        </>
    )
}