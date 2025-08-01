import { useEffect, useState, useMemo } from "react"
import { useParams, useNavigate } from "react-router-dom"
import axios from "axios"
import "../assets/styles/adminfilter.css"
import "../assets/styles/campform.css"

// campformCard
import { CampFormCard } from "./CampForm"

export let FilterPage = () => {
  let { category, filterType } = useParams()
  // console.log("this is category",category)
  let [data, setData] = useState([])
  let [searchTerm, setSearchTerm] = useState("")
  let [sortField, setSortField] = useState("")
  let [sortOrder, setSortOrder] = useState("asc")
  let [currentPage, setCurrentPage] = useState(1)
  let [approval, setApproval] = useState({})

  let navigate = useNavigate()

  let recordsPerPage = 5
  if (category === "donor") recordsPerPage = 6
  else if (category === "req") recordsPerPage = 8

  let isBloodRequestPage = category === "req"

  let hideControls = category === "camp" && filterType === "addcamp"

  useEffect(() => {
    let endpoints = {
      user: "http://localhost:3000/users",
      donor: "http://localhost:3000/blood_donor",
      req: "http://localhost:3000/blood_request",
      camp: "http://localhost:3000/camp",
    }

    if (endpoints[category]) {
      axios
        .get(endpoints[category])
        .then((res) => setData(res.data))
        .catch((err) => console.log(err))
    }
  }, [category, filterType,approval])

  let filteredData = useMemo(() => {
    if (!searchTerm) return data
    let x = searchTerm.toLowerCase()
    return data.filter(
      (el) =>
        el.fullName?.toLowerCase().includes(x) ||
        el.patientName?.toLowerCase().includes(x) ||
        el.email?.toLowerCase().includes(x) ||
        el.phone?.includes(x)
    )
  }, [data, searchTerm])

  let sortedData = useMemo(() => {
    if (!sortField) return filteredData
    let sorted = [...filteredData].sort((a, b) => {
      let v1 = (a[sortField] || "").toString().toLowerCase()
      let v2 = (b[sortField] || "").toString().toLowerCase()
      return v1.localeCompare(v2)
    })
    return sortOrder === "asc" ? sorted : sorted.reverse()
  }, [filteredData, sortField, sortOrder])

  let last = currentPage * recordsPerPage
  let first = last - recordsPerPage
  let currentRecords = sortedData.slice(first, last)
  let totalPages = Math.ceil(sortedData.length / recordsPerPage)

  let handleSort = (col) => {
    if (sortField === col)  {
      setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"))
    } else {
      setSortField(col)
      setSortOrder("asc")
    }
    setCurrentPage(1)
  }

  let categoryEndpoints = {
    user: "users",
    donor: "blood_donor",
    req: "blood_request",
    camp: "camp",
  }

  let handleRemove = (id) => {
    let endpoint = categoryEndpoints[category]
    if (!endpoint) return
    axios
      .delete(`http://localhost:3000/${endpoint}/${id}`)
      .then(() => axios.get(`http://localhost:3000/${endpoint}`))
      .then((res) => {
        let fresh = res.data
        setData(fresh)
        let newTotal = Math.ceil(fresh.length / recordsPerPage)
        if (currentPage > newTotal) {
          setCurrentPage(newTotal || 1)
        }
      })
      .catch((err) => console.error("Delete error:", err))
  }

  let handleEdit = (id) => {
    let endpoint = categoryEndpoints[category]
    if (!endpoint) return
    console.log("endpoint is here ",endpoint)
    navigate(`/AdminDashboard/${endpoint}/edit/${id}`)   
  }



// Blood Request Event Handler Request Status
 
  let handleStatus = (id, e) => {
    let status = e.target.value
    setApproval((prev) => ({
      ...prev,
      [id]: status,
    }))
  }

  let handleApproval = (id) => {
    if (!approval[id]) return
        axios.patch(`http://localhost:3000/${categoryEndpoints[category]}/${id}`, {
        approval: approval[id],
      })
      .then((res) => setApproval(approval[id]))
      .catch((err) => console.log(err))
  }


// Templates
let block_content

// Display Users
if (category === "user") {
  block_content = (
    <>
    <h1 className="pageHeading">All Users</h1>
    <div className="tableContainer">
      <table className="dataTable">
        <thead>
          <tr>
            <th>Unique Id</th>
            <th>Name</th>
            <th>Email</th>
            <th>Gender</th>
            <th>Contact</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentRecords.map(el => (
            <tr key={el.id}> 
              <td>{el.id}</td>
              <td style={{textTransform:"uppercase"}}>{el.fullName}</td>
              <td>{el.email}</td>
              <td style={{textTransform:"uppercase"}} >{el.gender}</td>
              <td>{el.phone}</td>
              <td>
                <button className="editBtn" onClick={() => handleEdit(el.id)}>Edit</button>
                <button className="removeBtn" onClick={() => handleRemove(el.id)}>Remove</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </>
  )
}

// Display Request
else if (category === "req") {
  block_content = (
    <>
    <h1 className="pageHeading">All Requests</h1>
     <div className="gridContainer">
    {currentRecords.map(request=>(

   
      <div key={request.id} className="bloodRequestCard">
      <h2>
           {request.patientName}
           <span >
             <select value={approval[request.id] || request.approval} id="approval" 
             onChange={(e) => handleStatus(request.id, e)} >
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="cancel">Cancel</option>
              </select>
              <button
                className="approvalBtn"
                onClick={() => handleApproval(request.id)}>  OK </button>
           </span>
      </h2>
      
      <div className="card-section">
        <p><strong>Gender:</strong> {request.gender}</p>
        <p><strong>Age:</strong> {request.age}</p>
        <p><strong>Weight:</strong> {request.weight} kg</p>
        <p><strong> Blood Group:</strong> {request.bloodGroup}</p>
        <p><strong>Urgency:</strong> {request.urgency}</p>
      </div>
      <div className="card-section">
        <p> <strong>Hospital:</strong> {request.hospital}</p>
        <p> <strong>Reason:</strong> {request.reason}</p>
        <p><strong>Doctor's Note:</strong> {request.doctorNote}</p>
      </div>
      <div><span>Request Status: <span className={
        request.approval=="approved"?"requestApproved":
        request.approval=="pending"?"requestPending":
        "requestCancel"}>
      
      {request.approval}</span></span></div>
      <div className="card-section location-contact">
        <p> {request.city}, {request.state}</p>
        <p> {request.contact}</p>
      </div>
      
      <div className="actionBtn">
        <button onClick={()=>handleEdit(request.id)} className="actionBtn1">Edit</button>
        <button onClick={()=>handleRemove(request.id)} className="actionBtn2">Remove</button>
      </div>
    </div>
  
    ))}
     </div>
    </>
  )
}

// Display Donors
else if (category === "donor") {
  block_content = (
    <>
    <h1 className="pageHeading">All Donors</h1>
    
   <div className="donorCardContainer">
    
  {currentRecords.map(donor => (
    <div className="donorCard" key={donor.id}>
      <div className="donorHeader">
        <h2>{donor.name}</h2>
        <span className="bloodGroupTag">{donor.bloodGroup}</span>
      </div>

      <div className="donorDetails">
        <p><strong>Age:</strong> {donor.age}</p>
        <p><strong>Gender:</strong> {donor.gender}</p>
        <p><strong>Contact:</strong> {donor.contact}</p>
        <p><strong>Email:</strong> {donor.email}</p>
        <p><strong>Location:</strong> {donor.city}, {donor.state}</p>
        <p><strong>Last Donation:</strong> {donor.lastDonationDate}</p>
        <p><strong>Medical History:</strong> {donor.medical_history === "yes" ? "Yes" : "No"}</p>
        <p><strong>Recent Surgery/Illness:</strong> {donor.surgery_illness === "yes" ? "Yes" : "No"}</p>
        <p><strong>Consent Given:</strong> {donor.consent ? "True" : "False"}</p>
        <p><strong>Active Donor:</strong> {donor.active === "yes" ? "Active" : "Inactive"}</p>
      </div>

      <div className="cardActions">
        <button className="editBtn" onClick={() => handleEdit(donor.id)}>Edit</button>
        <button className="removeBtn" onClick={() => handleRemove(donor.id)}>Remove</button>
      </div>
    </div>
  ))}
</div>
</>
  )
}

// Display Camp Form
else if (category === 'camp' && filterType === 'addcamp') {
  block_content = (
   <CampFormCard/>
  )
}

// Display All Camps
else if (category === 'camp' && filterType === "showallcamp") {
  block_content = (
    <>
    <h1 className="pageHeading">All Camps</h1>
    <div className="campDataContainer">
      {currentRecords.map((el, key) => (
        <div className="campCard" key={key}>
          <h2 className="campName"> {el.campName}</h2>
          <p><strong>Organiser:</strong> {el.organiserName}</p>
          <p><strong>Location:</strong> {el.location}, {el.city}, {el.state}</p>
          <p><strong>Date:</strong> {el.date}</p>
          <p><strong>Time:</strong> {el.time}</p>
          <p><strong>Contact:</strong>  {el.contact}</p>
          <p><strong>Email:</strong>  {el.email}</p>
          <p className="description">{el.description}</p>
          <p className="actionButton">
            <button className="btnE" onClick={()=>handleEdit(el.id)}>Edit</button>
            <button className="btnD" onClick={()=>handleRemove(el.id)}>Remove</button>
          </p>
        </div>
      ))}
    </div>
    </>
  )
}



// Pagination Next,Prev And Numbers  Button Logic
  let goTo = (i) => setCurrentPage(i) // 1
  let next = () => currentPage < totalPages && setCurrentPage((i) => i + 1) // 0+1
  let prev = () => currentPage > 1 && setCurrentPage((i) => i - 1) 

  return (
    <>
      {!hideControls && (
        <div className="adminContainer">
          <div className="controls">
            <input
              className="searchInput"
              type="search"
              placeholder="Search name, email, or phone..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value)
                setCurrentPage(1)
              }}
            />
          </div>

          <div className="sortButtons">
            {["fullName", "email", "gender"].map((col) => (
              <button
                key={col}
                className={`sortBtn ${sortField === col ? sortOrder : ""}`}
                onClick={() => handleSort(col)}
              >
                {col === "fullName" ? "Name" : col.charAt(0).toUpperCase() + col.slice(1)}
                {sortField === col && (sortOrder === "asc" ? " ▲" : " ▼")}
              </button>
            ))}

            {isBloodRequestPage && (
              <>
                <button
                  className={`sortBtn ${sortField === "urgency" ? sortOrder : ""}`}
                  onClick={() => handleSort("urgency")}
                >
                  Urgency {sortField === "urgency" && (sortOrder === "asc" ? "▲" : "▼")}
                </button>
                <button
                  className={`sortBtn ${sortField === "age" ? sortOrder : ""}`}
                  onClick={() => handleSort("age")}
                >
                  Age {sortField === "age" && (sortOrder === "asc" ? "▲" : "▼")}
                </button>
                <button
                  className={`sortBtn ${sortField === "weight" ? sortOrder : ""}`}
                  onClick={() => handleSort("weight")}
                >
                  Weight {sortField === "weight" && (sortOrder === "asc" ? "▲" : "▼")}
                </button>
              </>
            )}
          </div>
        </div>
      )}


      {block_content}


      {!hideControls && (
        <div className="paginationControls">
          <button onClick={prev} disabled={currentPage === 1}>Prev</button>
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              className={`pageBtn ${currentPage === i + 1 ? "activePage" : ""}`}
              onClick={() => goTo(i + 1)}
            >
              {i + 1}
            </button>
          ))}
          <button onClick={next} disabled={currentPage === totalPages}>Next</button>
        </div>
      )}
    </>
  )
}