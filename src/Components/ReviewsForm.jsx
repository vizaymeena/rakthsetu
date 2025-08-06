
import { useState } from 'react'
import axios from 'axios'
import '../assets/styles/reviewForm.css'

let ReviewForm = () => {
  let [review, setReview] = useState({
    name: '',
    message: '',
  })

  let [submitted, setSubmitted] = useState(false)

  let handleChange = (e) => {
    let { name, value } = e.target
    setReview(prev => ({ ...prev, [name]: value }))
  }

  let handleSubmit = (e) => {
    e.preventDefault()

    axios.post(`http://localhost:3000/reviews`,review)

    setSubmitted(true)
    setReview({ name: '', message: '' })

    setTimeout(() => setSubmitted(false), 4000)
  }

  return (
    <div className="review-form-container">
      <h2>Share Your Experience</h2>
      <p>Your feedback inspires others to save lives!</p>

      <form className="review-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={review.name}
          onChange={handleChange}
          placeholder="Your Name"
          required
        />
        <textarea
          name="message"
          value={review.message}
          onChange={handleChange}
          placeholder="Write your thoughts..."
          rows="4"
          required
        />
        <button type="submit">Submit Review</button>

        {submitted && <div className="review-success">❤️ Thank you for your feedback!</div>}
      </form>
    </div>
  )
}

export default ReviewForm
