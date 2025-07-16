import React, { useEffect } from 'react';
import '../assets/styles/bloodrequest.css';
import { useState } from 'react';
import { stateCityData } from "../data/staticdata"
import axios from "axios"

export default function BloodReq() {

  // states
  let [requestForm , setRequestForm] = useState({
    patientName:"",
    age:"",
    gender:"",
    weight:"",
    bloodGroup:"",
    urgency:"",
    state:"",
    city:"",
    contact:"",
    doctorNote:"",
    hospital:"",
    reason:""
  })

  let [cities,setCities] = useState([])


  useEffect(()=>{
     let selectedState = stateCityData.find((el)=> el.state == requestForm.state)
     if(selectedState){
      setCities(selectedState.cities)
     }
  },[requestForm.state])
  


  // event handlers
  function handleChange(e){
    let {name,value} = e.target
    setRequestForm((prev)=>({
      ...prev,
      [name]:value
    }))
  }

  function handleSubmit(e){
    e.preventDefault()
    axios.post(`http://localhost:3000/blood_request`,requestForm)







    // reset form after submission
    setRequestForm({
    patientName:"",
    age:"",
    gender:"",
    weight:"",
    bloodGroup:"",
    urgency:"",
    state:"",
    city:"",
    contact:"",
    doctorNote:"",
    hospital:"",
    reason:""
    })
  }


  return (
    <div className="bloodRequestContainer">
      <h1 className="formTitle">Blood Request Form</h1>
      <form className="bloodRequestForm" onSubmit={handleSubmit}>
        
        <div className="formRow">
          <label>Patient Name:</label>
          <input type="text" className="formInput" placeholder="Enter patient name" name="patientName" value={requestForm.patientName} onChange={handleChange} />
        </div>

        <div className="formRow">
          <label>Age:</label>
          <input type="number" className="formInput" placeholder="Age" name="age" value={requestForm.age} onChange={handleChange} />
        </div>
        <div className="formRow">
          <label>Gender:</label>
          <select name="gender" value={requestForm.gender} onChange={handleChange}>
            <option value="">Select</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div className="formRow">
          <label>Weight (kg):</label>
          <input type="number" className="formInput" placeholder="Weight in kg" name='weight' value={requestForm.weight} onChange={handleChange} />
        </div>

        <div className="formRow">
          <label>Blood Group:</label>
          <select className="formInput" value={requestForm.bloodGroup} name="bloodGroup" onChange={handleChange}>
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

        <div className="formRow">
          <label>Urgency:</label>
          <select className="formInput" value={requestForm.urgency} name='urgency' onChange={handleChange}>
            <option>Select</option>
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
            <option>Critical</option>
          </select>
        </div>

        <div className="formRow">
          <label>Contact:</label>
          <input type="text" className="formInput" placeholder="Phone number" value={requestForm.contact} name='contact' onChange={handleChange} />
        </div>

        <div className="formRow">
          <label>Hospital(at Required):</label>
          <input type="text" className="formInput" placeholder="Hospital name" name='hospital' value={requestForm.hospital} onChange={handleChange} />
        </div>

        <div className="formRow">
          <label>Reason:</label>
           <select className="formInput" value={requestForm.reason} name='reason' onChange={handleChange}>
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

        <div className='formRow'>
          <label htmlFor="">State</label>
          <select value={requestForm.state} name='state' onChange={handleChange}>
            <option value="">Select</option>
            {stateCityData?.map((el,key)=><option key={key}>{el.state}</option>)}
          </select>
        </div>

        <div className='formRow'>
          <label htmlFor="">City</label>
          <select value={requestForm.city} name='city' onChange={handleChange}>
            <option value="">Select</option>
            {cities.map((el,key)=><option key={key}>{el}</option>)}
          </select>
        </div>

        <div className="formRow">
          <label>Doctor's Note:</label>
          <textarea name="doctorNote" id="" rows={8} cols={80} maxLength={500} placeholder='doctor note max length 200 words' 
          value={requestForm.doctorNote} 
          onChange={handleChange} optional="true"></textarea>
        </div>

        

       
        <div className="formRow">
          <button type="submit" className="formButton">Submit Request</button>
        </div>

      </form>
    </div>
  );
}
