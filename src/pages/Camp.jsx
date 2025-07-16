import React, { useState } from "react";
import "../assets/styles/campform.css"; // create this CSS file or inline styles

const CampCreateForm = () => {
  const [camp, setCamp] = useState({
    campname: "",
    organiser: "",
    organisedBy: "",
    location: "",
    city: "",
    state: "",
    pinCode: "",
    date: "",
    time: "",
    contactNumber: "",
    email: "",
    description: "",
    registrationRequired: false,
    mapLink: ""
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCamp((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Camp Data Submitted:", camp);
    // TODO: Replace with POST request to your backend/db.json
  };

  return (
    <div className="campFormContainer">
      <h2>🩸 Organize a Blood Donation Camp</h2>
      <form className="campForm" onSubmit={handleSubmit}>

        <div className="formGroup">
          <label>Camp Name</label>
          <input name="campname" value={camp.campname} onChange={handleChange} required />
        </div>

        <div className="formGroup">
          <label>Organiser Name</label>
          <input name="organiser" value={camp.organiser} onChange={handleChange} required />
        </div>

        <div className="formGroup">
          <label>Organised By (NGO/Hospital)</label>
          <input name="organisedBy" value={camp.organisedBy} onChange={handleChange} />
        </div>

        <div className="formGroup">
          <label>Location / Venue</label>
          <input name="location" value={camp.location} onChange={handleChange} required />
        </div>

        <div className="formRow">
          <div className="formGroup">
            <label>City</label>
            <input name="city" value={camp.city} onChange={handleChange} required />
          </div>

          <div className="formGroup">
            <label>State</label>
            <input name="state" value={camp.state} onChange={handleChange} required />
          </div>
        </div>

        <div className="formRow">
          <div className="formGroup">
            <label>Pin Code</label>
            <input name="pinCode" value={camp.pinCode} onChange={handleChange} />
          </div>

          <div className="formGroup">
            <label>Date</label>
            <input type="date" name="date" value={camp.date} onChange={handleChange} required />
          </div>

          <div className="formGroup">
            <label>Time</label>
            <input name="time" value={camp.time} onChange={handleChange} placeholder="e.g. 10:00 AM - 4:00 PM" />
          </div>
        </div>

        <div className="formRow">
          <div className="formGroup">
            <label>Contact Number</label>
            <input name="contactNumber" value={camp.contactNumber} onChange={handleChange} required />
          </div>

          <div className="formGroup">
            <label>Email</label>
            <input name="email" value={camp.email} onChange={handleChange} />
          </div>
        </div>

        <div className="formGroup">
          <label>Description</label>
          <textarea name="description" value={camp.description} onChange={handleChange} rows="3" />
        </div>

        <div className="formGroup checkboxGroup">
          <label>
            <input
              type="checkbox"
              name="registrationRequired"
              checked={camp.registrationRequired}
              onChange={handleChange}
            />
            Registration Required
          </label>
        </div>

        <div className="formGroup">
          <label>Map Link (optional)</label>
          <input name="mapLink" value={camp.mapLink} onChange={handleChange} />
        </div>

        <button className="submitBtn" type="submit">Create Camp</button>
      </form>
    </div>
  );
};

export default CampCreateForm;
