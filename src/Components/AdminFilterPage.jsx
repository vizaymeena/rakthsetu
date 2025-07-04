import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"
import "../assets/styles/adminfilter.css"

export let FilterPage = () => {
  let { category, filterType } = useParams()
  let [data, setData] = useState([])
  let [searchTerm, setSearchTerm] = useState("")
  let [currentPage, setCurrentPage] = useState(1)
  let recordsPerPage = 5

  // Sorting states
  let [sortField, setSortField] = useState("")
  let [sortOrder, setSortOrder] = useState("asc")

  useEffect(() => {
    axios.get(`http://localhost:3000/users`)
      .then((res) => setData(res.data))
  }, [category])

  // Filter data if search term exists, else use all data
  let filteredData = searchTerm
    ? data.filter((el) => {
        let lowerSearch = searchTerm.toLowerCase()
        return (
          el.fullName.toLowerCase().includes(lowerSearch) ||
          el.email.toLowerCase().includes(lowerSearch) ||
          el.phone.includes(lowerSearch)
        )
      })
    : data

  // Apply sorting if a sort field is selected
  if (sortField) {
    filteredData.sort((a, b) => {
      let aVal = a[sortField]?.toLowerCase?.() || a[sortField]
      let bVal = b[sortField]?.toLowerCase?.() || b[sortField]

      if (aVal < bVal) return sortOrder === "asc" ? -1 : 1
      if (aVal > bVal) return sortOrder === "asc" ? 1 : -1
      return 0
    })
  }

  // Pagination calculations on filteredData
  let lastIndex = currentPage * recordsPerPage
  let firstIndex = lastIndex - recordsPerPage
  let currentRecords = filteredData.slice(firstIndex, lastIndex)
  let totalPages = Math.ceil(filteredData.length / recordsPerPage)

  // Page control functions
  let goToPage = (pageNum) => setCurrentPage(pageNum)
  let nextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1)
  }
  let prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1)
  }

  // Sort handler function
  const handleSort = (column) => {
    if (sortField === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc")
    } else {
      setSortField(column)
      setSortOrder("asc")
    }
  }

  return (
    <>
      <div className="adminContainer">

        {/* Search Header */}
        <div className="adminHeader">
          <div className="searchBar">
            <input
              type="search"
              placeholder="Search by name, email, or phone..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value)
                setCurrentPage(1)
              }}
            />
          </div>
        </div>

        {/* Title */}
        <h1 className="resultsTitle">User Results:</h1>

        {/* Data Table */}
        <div className="tableWrapper">
          <table className="dataTable">
            <thead>
              <tr>
                <th onClick={() => handleSort("fullName")}>
                  Name{" "}
                  {sortField === "fullName" && (sortOrder === "asc" ? "▲" : "▼")}
                </th>

                <th onClick={() => handleSort("email")}>
                  Email{" "}
                  {sortField === "email" && (sortOrder === "asc" ? "▲" : "▼")}
                </th>

                <th onClick={() => handleSort("gender")}>
                  Gender{" "}
                  {sortField === "gender" && (sortOrder === "asc" ? "▲" : "▼")}
                </th>

                <th>Contact</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filterType === "showAllUser" &&
                currentRecords.map((el) => (
                  <tr key={el.id}>
                    <td>{el.fullName}</td>
                    <td>{el.email}</td>
                    <td>{el.gender}</td>
                    <td>{el.phone}</td>
                    <td>
                      <button className="editBtn" onClick={() => Edit(el.id)}>Edit</button>
                      <button className="removeBtn" onClick={() => Remove(el.id)}>Remove</button>
                    </td>
                  </tr>
                ))}

              {/* No Records Found */}
              {filterType === "showAllUser" && currentRecords.length === 0 && (
                <tr>
                  <td colSpan="5">No records found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        <div className="paginationControls">
          <button onClick={prevPage} disabled={currentPage === 1}>
            Prev
          </button>

          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              className={currentPage === i + 1 ? "activePage" : ""}
              onClick={() => goToPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}

          <button onClick={nextPage} disabled={currentPage === totalPages || totalPages === 0}>
            Next
          </button>
        </div>

      </div>
    </>
  )
}
