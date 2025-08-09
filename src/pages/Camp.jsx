import { useEffect, useState } from "react";
import axios from "axios";
import "../assets/styles/camp.css";

export default function BloodCamp() {
  let [campData, setCampData] = useState([]);
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    axios.get(`http://localhost:3000/camp`)
      .then(res => setCampData(res.data))
      .catch(err => console.error("Error fetching camp data:", err));
  }, []);

  // Dynamic sub-filter options
  const getSubFilterOptions = () => {
    if (sortBy === "name") {
      return [
        { value: "asc", label: "A → Z" },
        { value: "desc", label: "Z → A" }
      ];
    }
    if (sortBy === "time") {
      return [
        { value: "earliest", label: "Earliest First" },
        { value: "latest", label: "Latest First" }
      ];
    }
    if (sortBy === "date") {
      return [
        { value: "oldest", label: "Oldest First" },
        { value: "newest", label: "Newest First" }
      ];
    }
    return [];
  };

  // Sorting logic
  const applySort = () => {
    let sortedData = [...campData];

    if (sortBy === "name") {
      sortedData.sort((a, b) => {
        return sortOrder === "asc"
          ? a.campName.localeCompare(b.campName)
          : b.campName.localeCompare(a.campName);
      });
    }

    if (sortBy === "time") {
      sortedData.sort((a, b) => {
        const timeA = new Date(`1970-01-01T${a.time}`);
        const timeB = new Date(`1970-01-01T${b.time}`);
        return sortOrder === "earliest" ? timeA - timeB : timeB - timeA;
      });
    }

    if (sortBy === "date") {
      sortedData.sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return sortOrder === "oldest" ? dateA - dateB : dateB - dateA;
      });
    }

    setCampData(sortedData);
  };

  return (
    <div className="camp-wrapper">
      <h2 className="camp-heading">Blood Donation Camps</h2>

      {/* Filters */}
      <div className="filters">
        <p>
          <strong>Sort By :-</strong>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="name">Name</option>
            <option value="time">Time</option>
            <option value="date">Date</option>
          </select>

          <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
            {getSubFilterOptions().map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>

          <button onClick={applySort}>Go</button>
        </p>

        <div className="searchDiv">
          <input type="search" placeholder="search by state,city..." />
          <button>Search</button>
        </div>
      </div>

      {/* Camp Cards */}
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
  );
}
