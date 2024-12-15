import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import style from './MovieReviews.module.css';

const MovieReviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}/reviews`,
          { params: { api_key: 'd824e721c403a45e0ad4663b682ad065' } }
        );
        setReviews(response.data.results);
      } catch (err) {
        setError('Failed to fetch reviews. Please try again later.');
        console.error('Error fetching movie reviews:', err);
      }
    };

    fetchReviews();
  }, [movieId]);

  return (
    <div>
      <h2>Reviews</h2>
      {error && <p className="error-message">{error}</p>}
      <ul className={style.reviewsList}>
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <li className={style.reviewsItem} key={review.id}>
              <p className={style.reviewsTextContent}>{review.content}</p>
              <p className={style.reviewsTextAuthor}><strong>- {review.author}</strong></p>
            </li>
          ))
        ) : (
          <p>No reviews available.</p>
        )}
      </ul>
    </div>
  );
};

export default MovieReviews;
