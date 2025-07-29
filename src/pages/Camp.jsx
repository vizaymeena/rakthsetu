import { useEffect,useState } from "react"
import axios from "axios"
import '../assets/styles/camp.css'

export default function BloodCamp() {
    let [campData,setCampData] = useState([])

    useEffect(()=>{
        axios.get(`http://localhost:3000/camp`)
        .then(res=>setCampData(res.data))
    },[])

    console.log(campData)

   return (
    <div className="camp-wrapper">
      <h2 className="camp-heading">Blood Donation Camps</h2>

      <div className="filters">
        <p>
            <strong>Sort By :-</strong>
            <select name="" id="">
                <option value="name">Name</option>
                <option value="time">Time</option>
                <option value="date">Date</option>
            </select>
            <select name="" id="">
                <option value="asc">Asc</option>
                <option value="desc">Desc</option>
            </select>
            <button>Go</button>
        </p>
       <div className="searchDiv"> <input type="search" placeholder="search by state,city..."/> <button>Search</button></div>
      </div>
      <div className="camp-grid">
        {campData.map((camp) => (
          <div key={camp.id} className="camp-card">
            <h3 className="camp-title">{camp.campName}</h3>
            <p><strong>Organiser:</strong> {camp.organiserName}</p>
            <p><strong>Location:</strong> {camp.location}, {camp.city}, {camp.state}</p>
            <p><strong>Date & Time:</strong> {camp.date} at {camp.time}</p>
            <p><strong>Contact:</strong> {camp.contact}</p>
            <p><strong>Email:</strong> {camp.email}</p>
            <p className="camp-description">{camp.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
