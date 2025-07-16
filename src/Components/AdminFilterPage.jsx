import { useEffect, useState, useMemo } from "react"
import { useParams } from "react-router-dom"
import axios from 'axios'
import "../assets/styles/adminfilter.css"
import { useNavigate } from "react-router-dom"
import CampCreateForm from "../pages/Camp"

export let FilterPage = () => {
  let { category ,filterType } = useParams()
  let [data, setData] = useState([])
  let [searchTerm, setSearchTerm] = useState("")
  let [sortField, setSortField] = useState("")
  let [sortOrder, setSortOrder] = useState("asc")
  let [currentPage, setCurrentPage] = useState(1)
  // records per page category wise
  let recordsPerPage 
  if(category == 'user'){
    recordsPerPage = 5
  } else if(category == 'donor'){
    recordsPerPage = 6
  } else if(category == 'req'){
    recordsPerPage = 8
  } else if (category == 'camp'){
    recordsPerPage = 5
  }
 
let isBloodRequestPage = category=="req"
let isAddCamp = category =="camp" && filterType =="addcamp"

  let navigate = useNavigate()

  useEffect(() => {
    let url 
    if(category=='user'){
      url = `http://localhost:3000/users`
    } else if(category == 'donor'){
      url = `http://localhost:3000/blood_donor`
    } else if(category == 'req'){
      url = `http://localhost:3000/blood_request`
    } else if(category == 'camp'){
      url = `http://localhost:3000/blood_camp`
    }

    if(url){
      axios.get(url)
      .then(res => setData(res.data))
      .catch(err => console.log(err))
    }
  }, [filterType])

  let filteredData = useMemo(() => {
    if (!searchTerm) return data
    let x = searchTerm.toLowerCase()
    return data.filter(el =>
      el.fullName.toLowerCase().includes(x) ||
      el.patientName.toLowerCase().includes(x) || 
      el.email.toLowerCase().includes(x) ||
      el.phone.includes(x)
    )
  }, [data, searchTerm])

 let sortedData = useMemo(() => {
  let base = Array.isArray(filteredData) ? filteredData : []
  if (!sortField) return base

  let arr = [...base].sort((a, b) => {
    let v1 = (a[sortField] || "").toString().toLowerCase()
    let v2 = (b[sortField] || "").toString().toLowerCase()
    if (v1 < v2) return -1
    if (v1 > v2) return 1
    return 0
  })

  return sortOrder === "asc" ? arr : arr.reverse()
}, [filteredData, sortField, sortOrder])


  console.log('sortedData : ' , sortedData)
  console.log('filterDataArray :' ,filteredData)




  let last = currentPage * recordsPerPage
  let first = last - recordsPerPage
  let currentRecords = sortedData.slice(first, last)
  let totalPages = Math.ceil(sortedData.length / recordsPerPage)

  let handleSort = (col) => {
    if (sortField === col) {
      setSortOrder(prev => (prev === "asc" ? "desc" : "asc"))
    } else {
      setSortField(col)
      setSortOrder("asc")
    }
    setCurrentPage(1)
  }



  // api end points
  const categoryEndpoints = {
  user: "users",
  donor: "blood_donor",
  req: "blood_request",
  camp: "blood_camp"
  }
  
  let handleRemove = (id) => {
      let endpoint = categoryEndpoints[category]
      if (!endpoint) return
      
      axios.delete(`http://localhost:3000/${endpoint}/${id}`)
        .then(() => axios.get(`http://localhost:3000/${endpoint}`))
        .then(res => {
          let fresh = res.data
          setData(fresh)
          let newTotal = Math.ceil(fresh.length / recordsPerPage)
          if (currentPage > newTotal) {
            setCurrentPage(newTotal || 1)
          }
        })
        .catch(err => console.error("Delete error:", err))
    }

    let handleEdit = (id) => {
      let endpoint = categoryEndpoints[category]
      if (!endpoint) return
      navigate(`/${endpoint}/edit/${id}`)
    }




  // Records categories wise
  let block_content 
  if(category == "user"){
     block_content = (
      <div className="tableContainer">
        <table className="dataTable">
          <thead>
            <tr>
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
                <td>{el.fullName}</td>
                <td>{el.email}</td>
                <td>{el.gender}</td>
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
     )
  } else if(category == 'donor'){
     block_content = (
      <div className="donorSection">
      <header className="donorHeader">
        <h2>Donor List</h2>
      </header>

      <section className="donorGrid">
        {currentRecords.map(donor => (
          <article key={donor.id} className={`donorCard ${donor.active ? "activeDonor" : "inactiveDonor"}`}>
            <div className="donorCardHeader">
              <h3 className="donorName">{donor.name}</h3>
              <span className="statusBadge">{donor.active ? "Active" : "Inactive"}</span>
            </div>
        
            <dl className="donorDetails">
              <div>
                <dt>Blood Group</dt>
                <dd>{donor.bloodGroup}</dd>
              </div>
              <div>
                <dt>Age</dt>
                <dd>{donor.age}</dd>
              </div>
              <div>
                <dt>Gender</dt>
                <dd>{donor.gender}</dd>
              </div>
              <div>
                <dt>Contact</dt>
                <dd>{donor.contact}</dd>
              </div>
              <div>
                <dt>City</dt>
                <dd>{donor.city}</dd>
              </div>
              <div>
                <dt>State</dt>
                <dd>{donor.state}</dd>
              </div>
              <div>
                <dt>Last Donation</dt>
                <dd>{donor.lastDonationDate}</dd>
              </div>
              <div>
                <dt>illness</dt>
                <dd>{donor.surgery_illness}</dd>
              </div>
               <div>
                <dt>Medical History</dt>
                <dd>{donor.medical_history}</dd>
              </div>
              <div>
                <dt>Consent</dt>
                <dd>{donor.consent ? "Yes" : "No"}</dd>
              </div>
              <div style={{display:"flex",justifyContent:'space-between',width:"100%"}}>
                <button onClick={()=>handleEdit(donor.id)} >Update</button>
                <button onClick={()=>handleRemove(donor.id)} >Remove</button>
              </div>
            </dl>
          </article>
        ))}
      </section>
    </div>
  )
  }
  else if(category == "req"){

    block_content = (
     <>
      <div className="reqCardContainer">
        {currentRecords.map((req) => (
          <div className="reqCard" key={req.id}>
            <h3>{req.patientName} ({req.gender})<span className={`urgencyTag ${req.urgency.toLowerCase()}`}>{req.urgency}</span></h3>
            <p><strong>Age:</strong> {req.age} yrs | <strong>Weight:</strong> {req.weight} kg </p>
            <p><strong>Blood Group:</strong> {req.bloodGroup}</p>
            <p><strong>Hospital:</strong> {req.hospital}, {req.city}, {req.state}</p>
            <p><strong>Reason:</strong> {req.reason}</p>
            <p><strong>Contact:</strong> 📞 {req.contact}</p>
            <details>
              <summary>Doctor Note</summary>
              <p className="note">{req.doctorNote}</p>
            </details>
          </div>
        ))}
      </div>
     </>
     )
  } 
  else if(isAddCamp){
    block_content = <CampCreateForm/>
  }




  let goTo = n => setCurrentPage(n)
  let next = () => currentPage < totalPages && setCurrentPage(n => n + 1)
  let prev = () => currentPage > 1 && setCurrentPage(n => n - 1)






  return (
    <div className="adminContainer">
      <div className="controls">
        <input
          className="searchInput"
          type="search"
          placeholder="Search name, email, or phone..."
          value={searchTerm}
          onChange={e => {
            setSearchTerm(e.target.value)
            setCurrentPage(1)
          }}
        />
      </div>

      {/* Sorting Button Bar */}
      <div className="sortButtons">
        {["fullName", "email", "gender"].map(col => (
          <button
            key={col}
            className={`sortBtn ${sortField === col ? sortOrder : ""}`}
            onClick={() => handleSort(col)}
          >
            {col === "fullName" ? "Name" : col.charAt(0).toUpperCase() + col.slice(1)} {/* E + mail = Email */}
            {sortField === col && (sortOrder === "asc" ? " ▲" : " ▼")}
          </button>
        ))}
        {isBloodRequestPage && (
          <>
          <button className={`sortBtn ${sortField == "urgency" ? sortOrder : ""}`} onClick={()=>handleSort("urgecy")}>
            Urgency {sortField=="urgency" && (sortOrder==="asc"? "▲" : "▼")}
          </button>

           <button className={`sortBtn ${sortField == "age" ? sortOrder : ""}`} onClick={()=>handleSort("age")}>
            Age {sortField=="age" && (sortOrder==="asc"? "▲" : "▼")}
          </button>

           <button className={`sortBtn ${sortField == "weight" ? sortOrder : ""}`} onClick={()=>handleSort("weight")}>
            Weight {sortField=="weight" && (sortOrder==="asc"? "▲" : "▼")}
          </button>
          </>
        )}
      </div>
      

      {/* display records on basis of :- user , bloodRequest , bloodDonor , bloodCamp */}
      { block_content }


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
    </div>
  )
}
