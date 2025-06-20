import { useState,useEffect } from "react"
import '../assets/styles/donate.css'
import { useLogin } from "../contexts/LoginContext"
// static images
import { slide01 as image1, slide02 as image2,  slide03 as image3 } from '../assets/images/donationPage'
let images = [ image1,  image2, image3 ]

export let Donate=()=>{

  let[currentIndex,setCurrentIndex] = useState(0);
  let[isPause,setPause] = useState(false);
  let[form,setForm] = useState({
    name: "",
    email: "",
    contact: "",
    gender: "",
    bloodGroup: "",
    age: "",
    state: "",
    city: "",
    address: "",
    donationDate: "",
    timeSlot: "",
    message: "",
  })
  let {admin,user} = useLogin()

  let handleSubmit=()=>{

  }
  let handleChange=()=>{

  }




  return(
    <>
    <section id="DonationBody">
      <div className="donationMain">
        
        <div className="slider">
          <div className="slideImgDiv">
            <img src={images[currentIndex]} alt="" />
          </div>

          <div className="dots">
            {/* Prev slide */}
            <span  
            onClick={
              ()=>setCurrentIndex(prev=>(prev-1+images.length)%images.length)
            }
            className="prev">⟨</span>

            {/* Next slide */}
            <span onClick={
               ()=>setCurrentIndex(prev=>(prev+1)%images.length)
            } 
            className="next">⟩</span>
          </div>
        </div>


      <div className="donorFormContainer">
  <h2>Register as a Blood Donor</h2>

  <form onSubmit={handleSubmit} className="donorForm">
    <div className="formGroup">
      <input type="text" name="name" placeholder="Full Name" value={form.name} onChange={handleChange}  />
      <input type="email" name="email" placeholder="Email Address" value={form.email} onChange={handleChange}  />
      <input type="tel" name="contact" placeholder="Contact Number" value={form.contact} onChange={handleChange}  />
    </div>

    <div className="formGroup">
      <select name="gender" value={form.gender} onChange={handleChange} >
        <option value="">Select Gender</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
        <option value="Other">Other</option>
      </select>
      <select name="bloodGroup" value={form.bloodGroup} onChange={handleChange} >
        <option value="">Select Blood Group</option>
        <option value="A+">A+</option>
        <option value="A-">A-</option>
        <option value="B+">B+</option>
        <option value="B-">B-</option>
        <option value="AB+">AB+</option>
        <option value="AB-">AB-</option>
        <option value="O+">O+</option>
        <option value="O-">O-</option>
      </select>
      <input type="number" name="age" placeholder="Age" value={form.age} onChange={handleChange}  />
    </div>

    <div className="formGroup">
      <input type="text" name="state" placeholder="State" value={form.state} onChange={handleChange}  />
      <input type="text" name="city" placeholder="City" value={form.city} onChange={handleChange}  />
      <input type="text" name="pinCode" placeholder="Pin Code" value={form.pinCode} onChange={handleChange}  />
    </div>

    <div className="formGroup">
      <textarea name="address" placeholder="Full Address" value={form.address} onChange={handleChange} ></textarea>
    </div>

    <div className="formGroup">
      <input type="date" name="donationDate" value={form.donationDate} onChange={handleChange}  />
      <select name="timeSlot" value={form.timeSlot} onChange={handleChange} >
        <option value="">Select Time Slot</option>
        <option value="Morning (9am-11am)">Morning (9am-11am)</option>
        <option value="Midday (11am-1pm)">Midday (11am-1pm)</option>
        <option value="Afternoon (2pm-4pm)">Afternoon (2pm-4pm)</option>
      </select>
    </div>

    <div className="formGroup">
      <textarea name="message" placeholder="Any message for us (optional)" value={form.message} onChange={handleChange}></textarea>
    </div>
    {
      admin || user ? <button type="submit" className="registerButton">Register as Donor</button>:
      <button onClick={()=>alert("Please login first")} >Register as Donor</button>
    }
  </form>
</div>



      </div>

    </section>
    </>
  )
}

