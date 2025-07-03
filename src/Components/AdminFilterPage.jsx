import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../assets/styles/adminfilter.css";

export const FilterPage = () => {
  let { category, filterType } = useParams();
  let [data, setData] = useState([]);
  let [currentPage, setCurrentPage] = useState(1);
  let recordsPerPage = 5;

  useEffect(() => {
    axios.get(`http://localhost:3000/users`)
    .then((res) => setData(res.data))
  }, [filterType])

  // Pagination calculations
  let lastIndex = currentPage * recordsPerPage;
  let firstIndex = lastIndex - recordsPerPage;
  let currentRecords = data.slice(firstIndex, lastIndex);
  let totalPages = Math.ceil(data.length / recordsPerPage);

  let goToPage = (pageNum) => {
    setCurrentPage(pageNum);
  };

  let nextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  let prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <>
      <div className="adminContainer">
        {/* Search & Sort Header */}
        <div className="adminHeader">
          <div className="searchBar">
            <input type="search" placeholder="Search users..." />
            <button className="primaryBtn">Go</button>
          </div>

          <div className="filterBar">
            <h4>Sort By:</h4>
            <div className="selectContainer">
              <select>
                <option value="">Select</option>
                <option value="gender">Gender</option>
                <option value="email">Email</option>
                <option value="name">Name</option>
              </select>
            </div>
          </div>
        </div>

        {/* Title */}
        <h1 className="resultsTitle">User Results:</h1>

        {/* Data Table */}
        <div className="tableWrapper">
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
              {filterType === "showAllUser" &&
                currentRecords.map((el) => (
                  <tr key={el.id}>
                    <td>{el.fullName}</td>
                    <td>{el.email}</td>
                    <td>{el.gender}</td>
                    <td>{el.phone}</td>
                    <td>
                      <button className="editBtn" onClick={() => Edit(el.id)}> Edit </button>
                      <button className="removeBtn" onClick={() => Remove(el.id)}> Remove </button>
                    </td>
                  </tr>
                ))}
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

          <button onClick={nextPage} disabled={currentPage === totalPages}>
            Next
          </button>
        </div>
      </div>
    </>
  )
}
