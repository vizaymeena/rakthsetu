import { useEffect, useState } from 'react'
import '../assets/styles/adminfilter.css'
import axios from "axios"
export let CampFormCard =()=>{

    let [campForm,setCampForm] = useState({})
    let [recentCamp,setRecentCamp] = useState([])

    let formVariables = {
        campName:'',
        organiserName:'',
        location:'',
        state:'',
        city:'',
        date:'',
        time:'',
        contact:'',
        email:'',
        description:''
    }
    let resetForm=()=>{
        setCampForm({...formVariables})
    }

    // useEffects
    useEffect(()=>{
        axios.get(`http://localhost:3000/camp`)
        .then(res=>{
            console.log(res.data.length)
            let recentCampData = res.data.reverse().slice(0,5)
            console.log(recentCampData)
            setRecentCamp(recentCampData)
        })
    },[campForm])

    // Event Handlers
    let handleChange=(e)=>{
        let {name,value} = e.target
        setCampForm((prv)=> ({
            ...prv,
            [name]:value
        })
    )
    }

    let handleSubmit=(e)=>{
        e.preventDefault();
        axios.post(`http://localhost:3000/camp`,campForm) // posted
    
        resetForm() // reset form after successfull submission
        alert("camp created")
    }

    return(
     <>
     <div className='bodyDiv'>
      <div className="addCampContainer">
        <h2>Add Blood Donation Camp</h2>
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
          name='location' value={campForm.location || ""} onChange={handleChange}/>
        </div>

          <div>
          <label>State</label>
          <input type="text" placeholder="State Name" 
           name='state' value={campForm.state || ""} onChange={handleChange} />
        </div>

        <div>
          <label>City</label>
          <input type="text" placeholder="City Name"
           name='city' value={campForm.city || ""} onChange={handleChange}/>
        </div>

        <div>
          <label>Date</label>
          <input type="date" 
          name='date' value={campForm.date || ""} onChange={handleChange}/>
        </div>

        <div>
          <label>Time</label>
          <input type="time"
           name='time' value={campForm.time || ""} onChange={handleChange} />
        </div>

        <div>
          <label>Contact Number</label>
          <input type="text" placeholder="Phone Number" 
          name='contact' value={campForm.contact || ""} onChange={handleChange}/>
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

        <button type='submit' className="submitBtn">Add Camp</button>
        </form>
     </div>

     <div className='recentCampAdded'>
        <h4>Recently Added Camp</h4>
        <div className='ul'>
            <ul>
                {
                    recentCamp.map((el,key)=><li key={key}>{el.campName}</li>)
                }
            </ul>
        </div>
     </div>
     </div>
    </>
    )
}