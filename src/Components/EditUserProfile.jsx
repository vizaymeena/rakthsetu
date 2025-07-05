import { useParams, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios"
import '../assets/styles/edituser.css'

let EditUserProfile = () => {
  let { id } = useParams()
  let navigate = useNavigate()
  let [user, setUser] = useState(null)

  useEffect(() => {
    axios.get(`http://localhost:3000/users/${id}`)
      .then(res => setUser(res.data))
      .catch(err => console.error(err))
  }, [id])

  let handleSubmit = (updatedData) => {
    axios.put(`http://localhost:3000/users/${id}`, updatedData)
      .then(() => navigate(-1))
      .catch(err => console.error(err))
  }

  if (!user) return <p className="loading">Loading user data...</p>

  return (
    <div className="form-container">
      <h2>Edit User Profile</h2>
      <form className="edit-form" onSubmit={e => {
        e.preventDefault()
        let form = e.target
        handleSubmit({
          fullName: form.fullName.value,
          email: form.email.value,
          gender: form.gender.value,
          phone: form.phone.value,
        })
      }}>
        <div className="form-group">
          <label>Name:</label>
          <input name="fullName" defaultValue={user.fullName} />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input type="email" name="email" defaultValue={user.email} />
        </div>
        <div className="form-group">
          <label>Gender:</label>
          <select name="gender" defaultValue={user.gender}>
            <option>Male</option>
            <option>Female</option>
          </select>
        </div>
        <div className="form-group">
          <label>Phone:</label>
          <input name="phone" defaultValue={user.phone} />
        </div>
        <div className="form-actions">
          <button type="submit" className="save-btn">Save</button>
          <button type="button" className="cancel-btn" onClick={() => navigate(-1)}>Cancel</button>
        </div>
      </form>
    </div>
  )
}

export default EditUserProfile
