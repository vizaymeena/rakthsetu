import "../assets/styles/registration.css"
import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Register = () => {

  
  const registerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -50 },
  };

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    bloodGroup: '',
    age: '',
    location: '',
    lastDonation: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data Submitted:', formData);
    // Here you can send formData to your API using axios/fetch
  };

  return (
    <>
     <motion.div
      className="flex justify-center items-center min-h-screen bg-gradient-to-br from-red-100 to-white"
      variants={registerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      transition={{ duration: 0.6, ease: "easeInOut" }}
    >
    <div className="form-wrapper">
      <div className="form-container">
        <h2>Donor Registration</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Full Name</label>
            <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Email ID</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Mobile Number</label>
            <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required pattern="[0-9]{10}" />
          </div>

          <div className="form-group">
            <label>Blood Group</label>
            <select name="bloodGroup" value={formData.bloodGroup} onChange={handleChange} required>
              <option value="">Select</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
            </select>
          </div>

          <div className="form-group">
            <label>Age</label>
            <input type="number" name="age" value={formData.age} onChange={handleChange} min="18" max="65" required />
          </div>

          <div className="form-group">
            <label>City / Location</label>
            <input type="text" name="location" value={formData.location} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Last Donation Date</label>
            <input type="date" name="lastDonation" value={formData.lastDonation} onChange={handleChange} />
          </div>

          <button type="submit">Register Now</button>
        </form>
      </div>
    </div>
    </motion.div>
    </>
  );
};

export default Register
