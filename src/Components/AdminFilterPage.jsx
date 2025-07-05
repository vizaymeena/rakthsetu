import { useEffect, useState, useMemo } from "react"
import { useParams } from "react-router-dom"
import axios from 'axios'
import "../assets/styles/adminfilter.css"
import { useNavigate } from "react-router-dom"

export let FilterPage = () => {
  let { filterType } = useParams()
  let [data, setData] = useState([])
  let [searchTerm, setSearchTerm] = useState("")
  let [sortField, setSortField] = useState("")
  let [sortOrder, setSortOrder] = useState("asc")
  let [currentPage, setCurrentPage] = useState(1)
  let recordsPerPage = 5

  let navigate = useNavigate()

  useEffect(() => {
    axios.get("http://localhost:3000/users")
    .then(res => setData(res.data))
  }, [filterType])

  let filteredData = useMemo(() => {
    if (!searchTerm) return data
    let l = searchTerm.toLowerCase()
    return data.filter(el =>
      el.fullName.toLowerCase().includes(l) ||
      el.email.toLowerCase().includes(l) ||
      el.phone.includes(l)
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


  let handleDelete = (id) => {
  axios.delete(`http://localhost:3000/users/${id}`)
    .then(() => axios.get("http://localhost:3000/users"))
    .then(res => {
      let fresh = res.data
      setData(fresh)

      // Fix pagination if current page is now empty
      let newTotal = Math.ceil(fresh.length / recordsPerPage)
      if (currentPage > newTotal) {
        setCurrentPage(newTotal || 1)
      }
    })
    .catch(err => console.error("Delete error:", err))
}

let handleEdit = (id) => {
    navigate(`/users/edit/${id}`)
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
      </div>

      <div className="tableContainer">
        <table className="dataTable">
          <thead>
            <tr>
              <th>Name</th><th>Email</th><th>Gender</th>
              <th>Contact</th><th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentRecords.length > 0 ? currentRecords.map(el => (
              <tr key={el.id}>
                <td>{el.fullName}</td>
                <td>{el.email}</td>
                <td>{el.gender}</td>
                <td>{el.phone}</td>
                <td className="actionButtonDiv">
                  <button className="editBtn" onClick={() => handleEdit(el.id)}>Edit</button>
                  <button className="removeBtn" onClick={() => handleDelete(el.id)}>Remove</button>
                </td>
              </tr>
            )) : (
              <tr><td colSpan="5" className="noRecords">No records found.</td></tr>
            )}
          </tbody>
        </table>
      </div>

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
