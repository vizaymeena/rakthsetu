import { Link } from "react-router-dom"
import "../assets/styles/userDashboard.css"
import { useEffect, useState , useMemo } from "react"
import axios from "axios"
import { useLogin } from "../contexts/LoginContext"
export let UserDashboard=()=>{
 // states
  let [data,setData]=useState([])
  
  let {user} = useLogin() 
  console.log(user)
  let [currentPage,setCurrentPage]=useState(1)

  // const
  let dataPerPage = 5 
  let totalPages = Math.ceil((data.length)/dataPerPage)
  let endIndex = currentPage * dataPerPage 
  let startIndex =  endIndex - dataPerPage
  console.log("check Data" ,data)
  let currentRecord =  data.slice(startIndex,endIndex)


  let navbar = [
    {label:"Home",path:"/"},
    {label:"Notification",path:""},
    {label:"Donations",path:""},
    {label:"Help",path:""},
    {label:"Logout",path:""},
  ]
 // side effects 
  useEffect(()=>{
    if(!user) return 
    axios.get(`http://localhost:3000/blood_request/?email=${user}`) // json obj
    .then((res)=>setData(res.data)) // set state
    .catch((error)=>console.log(error)) // catch error
  },[user])  // mount on every refresh
 
 
  console.log("type of data", typeof(data))
  console.log(data)

  // Event Handlers


  return(
    <>
    <div className="containerDashboard">

      <div className="userD_sidebar">
        <div className="userAbout">
          <img alt=" no image right now" />
            <p><strong>dipti anand</strong></p>
          <div>
            <button>Edit</button>
          </div>
        </div>

        <nav className="sidebar_nav">
          {
            navbar.map((el,key)=>(
              <Link className="span" key={key} to={el.path}>{el.label}</Link>
            ))
          }
        </nav>
      </div>

      <div className="rightBodyContainer">

        <div>
          <h1>Hello Mrs Dipti</h1>
        </div>

        <div>

          <div className="userDash_RequestResults">
            <h4>Your Request</h4>
            <div className="gridContainer"> 
              {currentRecord.map((el, key) => (
                <div className="requestCard" key={key}>
                  <div className="cardTitle">
                    <h4>{el.patientName}</h4>
                    <p><strong>{el.email}</strong></p>
                    <p className={`status ${el.approval || "pending"}`}>{el.approval}</p>
                  </div>
              
                  <div className="cardDetails">
                    <span><strong>Gender:</strong> {el.gender}</span>
                    <span><strong>Age:</strong> {el.age}</span>
                    <span><strong>Weight:</strong> {el.weight} kg</span>
                    <span><strong>Blood Group:</strong> {el.bloodGroup}</span>
                    <span><strong>Urgency:</strong> {el.urgency}</span>
                    <span><strong>State:</strong> {el.state}</span>
                    <span><strong>City:</strong> {el.city}</span>
                    <span><strong>Contact:</strong> {el.contact}</span>
                    <span><strong>Hospital:</strong> {el.hospital}</span>
                    <span><strong>Reason:</strong> {el.reason}</span>
                     {/* <span><strong>Doctor Note:</strong> {el.doctorNote}</span> */}
                  </div>
                </div>
              ))}
            </div>
          </div>


          <div className="userDash_DonationResults">
            <h4>Your Donation</h4>
            <div>

            </div>
          </div>

          <div>
            <h4>Nearby Camps</h4>
            <div>

            </div>

          </div>

          
        </div>


      </div>

    </div>
    </>
  )
} 