import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import style from './MovieCast.module.css';

const MovieCast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCast = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}/credits`,
          {
            params: { api_key: 'd824e721c403a45e0ad4663b682ad065' }
          }
        );
        setCast(response.data.cast);
      } catch (err) {
        setError('Не вдалося завантажити акторів.');
        console.error('Error fetching movie cast:', err);
      }
    };

    fetchCast();
  }, [movieId]);

  return (
    <div className={style.castContainer}>
      {error && <p className={style.errorMessage}>{error}</p>}
      <ul className={style.castList}>
        {cast.length > 0 ? (
          cast.map((actor) => (
            <li key={actor.id} className={style.castItem}>
              <img
                src={
                  actor.profile_path
                    ? `https://image.tmdb.org/t/p/w500${actor.profile_path}`
                    : 'https://via.placeholder.com/150' // placeholder image if no actor photo
                }
                alt={actor.name}
                className={style.actorImage}
              />
              <p className={style.actorName}>{actor.name}</p>
            </li>
          ))
        ) : (
          <p>No cast available.</p>
        )}
      </ul>
    </div>
  );
};

export default MovieCast;
