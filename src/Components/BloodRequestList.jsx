
import { useState, useEffect } from "react";
import axios from "axios";
import { useLogin } from "../contexts/LoginContext";
import { useNavigate } from "react-router-dom";

export default function BloodRequestList() {
  const { user } = useLogin();
  const [data, setData] = useState([]);
  let [deleteIndex,setDeleteIndex] = useState()



  const [filteredData, setFilteredData] = useState([]);
  const [filterBy, setFilterBy] = useState("");
  const [subFilter, setSubFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  let navigate = useNavigate()
  

  const subFilterOptions = {
    patientName: ["Asc", "Desc"],
    email: ["Asc", "Desc"],
    urgency: ["Low", "Medium", "High"],
  };

  useEffect(() => {
    if (!user) return;
    axios
      .get(`http://localhost:3000/blood_request/?email=${user}`)
      .then((res) => setData(res.data));
  }, [user,deleteIndex]);

  const sourceData = filteredData.length > 0 ? filteredData : data;
  const dataPerPage = 3;
  const totalPages = Math.ceil(sourceData.length / dataPerPage);
  const startIndex = (currentPage - 1) * dataPerPage;
  const endIndex = currentPage * dataPerPage;
  const displayData = sourceData.slice(startIndex, endIndex);

  const handleSearch = () => {
    if (!filterBy && !subFilter) return;

    let sorted = [...data];

    if (filterBy === "all") {
      sorted = data;
    } else if (filterBy === "urgency") {
      sorted = sorted.filter((el) => el.urgency.toLowerCase() === subFilter);
    } else {
      sorted.sort((a, b) => {
        const valA = a[filterBy].toString().toLowerCase();
        const valB = b[filterBy].toString().toLowerCase();
        return subFilter === "asc"
          ? valA > valB
            ? 1
            : -1
          : valB > valA
          ? -1
          : 1;
      });
    }

    setFilteredData(sorted);
    setCurrentPage(1);
  };

  const goTo = (page) => setCurrentPage(page);
  const prev = () => currentPage > 1 && setCurrentPage((prev) => prev - 1);
  const next = () => currentPage < totalPages && setCurrentPage((prev) => prev + 1);



  // Handle Request Edit
  let HandleEdit=(id)=>{
    console.log("passing id",id)
    navigate('userEditRequest',{
      state:{
        editIndex:id
      }
    })
  }

  let handleRemove=(id)=>{
    axios.delete(`http://localhost:3000/blood_request/${id}`)
    .then((res)=>setDeleteIndex(id))
  }

  return (
    <div className="userDash_RequestResults">
     
      <div className="filterContainer">
        <label htmlFor="filterField">Filter By:</label>
        <select
          id="filterField"
          className="filterSelect"
          onChange={(e) => {
            setFilterBy(e.target.value);
            setSubFilter("");
          }}
        >
          <option value="all">All</option>
          <option value="patientName">Name</option>
          <option value="email">Email</option>
          <option value="urgency">Urgency</option>
        </select>
         
        {filterBy !== "all" && filterBy && (
          <select
            className="filterSelect"
            onChange={(e) => setSubFilter(e.target.value)}
          >
            <option value="">Select</option>
            {subFilterOptions[filterBy].map((el, index) => (
              <option value={el.toLowerCase()} key={index}>
                {el}
              </option>
            ))}
          </select>
        )}

        <button className="filterBtn" onClick={handleSearch}>
          Search
        </button>
      </div>
      <h4 className="requestTitle">Recent Blood Requests</h4>
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
              <span><strong>Doctor Note:</strong> {el.doctorNote}</span>
            </div>
            <div className="ctabutton">
              <button onClick={()=>HandleEdit(el.id)} className="edit">Edit</button>
              <button onClick={()=>handleRemove(el.id)}  className="cancel">Cancel</button>
            </div>
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="paginationControls">
          <button onClick={prev} disabled={currentPage === 1}>Prev</button>
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              onClick={() => goTo(index + 1)}
              className={`pageButton ${currentPage === index + 1 ? "activePage" : ""}`}
            >
              {index + 1}
            </button>
          ))}
          <button onClick={next} disabled={currentPage === totalPages}>Next</button>
        </div>
      )}
    </div>
  );
}
