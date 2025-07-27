import { Link } from "react-router-dom"
import "../assets/styles/userDashboard.css"
import { useEffect, useState , useMemo } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { useLogin } from "../contexts/LoginContext"
import { Outlet } from "react-router-dom"
import '../assets/styles/userdashboardcampcard.css';


export let UserDashboard=()=>{
 // states
  let [data,setData]=useState([])
  let [registeredDonor,setRegisteredDonor] = useState({})
  let [nearByCamps,setNearyByCamps] = useState([])

  let navigate = useNavigate()
  let {user} = useLogin() 
  let [currentPage,setCurrentPage]=useState(1)

  // Filters
  let [filterBy,setFilterBy]=useState("")
  let [subFilter,setSubFilter] = useState("")
  let [filteredData,setFilteredData] = useState([])

  let subFilterOptions={
    patientName:["Asc","Desc"],
    email:["Asc","Desc"],
    urgency:["Low","Medium","High"]
  }

  // const
  let sourceData = filteredData.length >0 ? filteredData : data
  let dataPerPage = 3

  let totalPages = Math.ceil(sourceData.length/dataPerPage)
  let endIndex = currentPage * dataPerPage 
  let startIndex =  endIndex - dataPerPage
  // console.log("check Data" ,data)
  let displayData =  sourceData.slice(startIndex,endIndex)


    let navbar = [
    { label: "Home", path: "/" },
    { label: "Notification", path: "/UserDashboard/notifications" },
    { label: "Donations", path: "" },
    { label: "Help", path: "" },
    { label: "Logout", path: "" },
  ]


 

 // side effects 
  useEffect(()=>{
    if(!user) return 
    axios.get(`http://localhost:3000/blood_request/?email=${user}`) // json obj
    .then((res)=>setData(res.data)) // set state
    // .catch((error)=>console.log(error)) // catch error
  },[user])  // mount on every refresh

  useEffect(()=>{
    if(!user) return 
    axios.get(`http://localhost:3000/blood_donor/?email=${user}`)
    .then((res)=>{
      if(!res.data.length < 0) return 
      setRegisteredDonor(true)

      let {state,city} = res.data[0]
      
      axios.get(`http://localhost:3000/camp/?state=${state}&city=${city}`)    
      .then((res)=>setNearyByCamps(res.data))
    })

   
    
  },[user])
 
  console.log("NearbyCamp after effects",nearByCamps)
 
  // Handle Search
  let handleSearch=()=>{
    if(!filterBy && !subFilter) return;
    
    let sorted = [...data]
    if(filterBy === "all"){
      sorted = data
    }
    else if(filterBy === 'urgency' && subFilter === 'low'){
      sorted = sorted.filter((el)=>el.urgency.toLowerCase() === subFilter.toLocaleLowerCase())
    }
    else if(filterBy === 'urgency' && subFilter === 'medium'){
      sorted = sorted.filter((el)=>el.urgency.toLowerCase() === subFilter)
    }
    else if( filterBy === "urgency" && subFilter === "high"){
      sorted = sorted.filter((el)=>el.urgency === subFilter)
    }
    
    else{
     
      sorted.sort((a,b)=>{
        let valueA = a[filterBy].toString().toLowerCase() 
        let valueB = b[filterBy].toString().toLowerCase()

        if(subFilter === "asc") return valueA > valueB ? 1 : -1 // place a before b
        if(subFilter === "desc") return valueB > valueA ? -1 : 1 // place b before a 
        return 0
      })
    }
    setFilteredData(sorted)
    setCurrentPage(1)
  }
 
 
  

  // Event Handlers

  let goTo =(pageNo)=> setCurrentPage(pageNo)
  let prev =()=> currentPage > 1 && setCurrentPage((curPage)=>curPage-1)
  let next =()=> currentPage < totalPages && setCurrentPage((curPage)=>curPage+1)



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
            navbar.map((el)=>{

              if(el.label == "Logout"){
               return(
                <span className="span spanLogout" key={el.label} 
                  style={{cursor:"pointer"}}
                  onClick={()=>{
                  sessionStorage.removeItem("user")
                  navigate("/")
                }} > {el.label}</span> 
                )}

                return(
                  <Link className="span" key={el.label} to={el.path}>{el.label}</Link>
                )
              })
          }
        </nav>
      </div>

      <div className="rightBodyContainer">

        <div>
          <h4>Hello Mrs Dipti</h4>

          <div>
            <Outlet/>
          </div>
        </div>

        <div>

          <div className="userDash_RequestResults">
            <h4>Your Request</h4>
           <div className="filterContainer">
              <label htmlFor="filterField">Filter By:</label>
              <select id="filterField" className="filterSelect"
               onChange={(e)=>{
                setFilterBy(e.target.value)
                setSubFilter("")
               }}>
                    <option value="all">All</option>
                    <option value="patientName">Name</option>
                    <option value="email">Email</option>
                    <option value="urgency">Urgency</option>
              </select>

              {/* show subfilter only if primary filter is selected by user*/}
              {filterBy!=="all" && filterBy && (
              <select id="sortOrder" className="filterSelect"
               onChange={(e)=>{
                setSubFilter(e.target.value)
               }}>                
                  <option value="">Select</option>
                  {subFilterOptions[filterBy].map((el,index)=>(
                    <option value={el.toLowerCase()} key={index}>{el}</option>  
                  ))}
              </select>
              )}

              <button onClick={handleSearch} className="filterBtn">Search</button>
            </div>


            <div className="gridContainer"> 
              {displayData.map((el) => (
                <div className="requestCard" key={el.id || el.email}>
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
                     <span style={{width:'100%'}}><strong style={{width:'100%'}}>Doctor Note:</strong> {el.doctorNote}</span>
                  </div>
                  <div className="ctabutton">
                    <button className="edit" >Edit</button>
                    <button className="cancel" >Cancel</button>
                  </div>
                </div>
              ))}
            </div>
            {/* pagination */}
             { totalPages > 1 && (
              <div className="paginationControls">
              <button onClick={prev} disabled={currentPage === 1}>Prev</button>
                {[...Array(totalPages)].map((_,index)=>(
                  
                    <button onClick={()=>goTo(index+1)} className={`pageButton ${currentPage == index+1? "activePage":""}`} key={index}>{index+1}</button>
                  
                ))}
                <button onClick={next} disabled={currentPage === totalPages}>Next</button>
              </div>
             )
             }
          </div>



         {/* Show camps if user is a registered donor */}
          
           <div className="userDash_DonationResults">
  <h4>Nearby Camps</h4>
  <div>
    {registeredDonor &&
      nearByCamps.map((camp) => (
        
        <div key={camp.id} className="campcard">
          <div className="campgrid">
            <div className="campmain">
              <h2 className="camptitle">{camp.campName}</h2>
              <p className="campdescription">{camp.description}</p>
            </div>
            <div className="campdetails">
              <div>
                <strong>Organiser:</strong>
                <span>{camp.organiserName}</span>
              </div>
              <div>
                <strong>Location:</strong>
                <span>{camp.location}, {camp.city}, {camp.state}</span>
              </div>
              <div>
                <strong>Date & Time:</strong>
                <span>{camp.date} @ {camp.time}</span>
              </div>
              <div>
                <strong>Contact:</strong>
                <span>{camp.contact}</span>
              </div>
              <div>
                <strong>Email:</strong>
                <span>{camp.email}</span>
              </div>
            </div>
          </div>
        </div>
        
      ))}
  </div>
</div>

    






          <div>
           
            <div>

            </div>

          </div>

          
        </div>


      </div>

    </div>
    </>
  )
} 