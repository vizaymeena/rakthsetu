import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../assets/styles/reviewForm.css'

const ReviewSlider = () => {
  const [reviews, setReviews] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const cardsPerSlide = 3;

  useEffect(() => {
    axios.get('http://localhost:3000/reviews')
      .then(res => setReviews(res.data))
      .catch(err => console.error('Failed to fetch reviews:', err));
  }, []);


  useEffect(() => {
    const interval = setInterval(() => {
      setStartIndex((prevIndex) =>
        (prevIndex + cardsPerSlide) % reviews.length    // 0 + 3 % 4 = 3
      );
    }, 4000);

    return () => clearInterval(interval);
  }, [reviews.length]);

  const getCurrentSlide = () => {
    const slice = [];
    for (let i = 0; i < cardsPerSlide; i++) {
      const index = (startIndex + i) % reviews.length;
      slice.push(reviews[index]);
    }
    return slice;
  };

  return (
    <>
    <h2 className='userFeedbacks'>User Feedbacks</h2>
    <div className="review-slider-grid">
   
      {reviews.length >= 3 ? (
        getCurrentSlide().map((review, index) => (
          <div className="review-card" key={index}>
            <p className="review-message">“{review?.message || "No message"}”</p>
            <p className="review-author">– {review?.name || "Anonymous"}</p>
          </div>
        ))
      ) : (
        <p className="review-message">Not enough reviews yet. Be the first to leave one!</p>
      )}
    </div>
    </>

  );
};

export default ReviewSlider;
