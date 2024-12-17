import React, { useEffect, useState, Suspense, useRef } from 'react';
import { useParams, useNavigate, useLocation, Routes, Route, Link } from "react-router-dom";
import axios from 'axios';
import style from './MovieDetailPage.module.css';


const MovieCast = React.lazy(() => import('../../components/MovieCast/MovieCast'));
const MovieReviews = React.lazy(() => import('../../components/MovieReviews/MovieReviews'));


const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);

  const from = useRef(location.state?.from || "/movies");

  useEffect(() => {
    axios
      .get(`https://api.themoviedb.org/3/movie/${movieId}`, {
        params: { api_key: 'd824e721c403a45e0ad4663b682ad065' },
      })
      .then((response) => setMovie(response.data))
      .catch((error) => console.error('Error fetching movie details:', error));
  }, [movieId]);

  const handleGoBack = () => {
    navigate(from.current);
  };

  if (!movie) return <p>Loading...</p>;


  return (
    <div className={style.detailsContainer}>
      <button className={style.btnBack} onClick={handleGoBack}>Go back</button>
      <h1>{movie.title}</h1>
      <div className={style.detailsItem}>
        <img className={style.poster} src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
        <p className={style.detailsText}>{movie.overview}</p>
      </div>
      <nav className={style.detailsLink}>
        <Link to={`/movies/${movieId}/cast`} state={{ from: from.current }}>
          Cast
        </Link>{' '}
        <Link to={`/movies/${movieId}/reviews`} state={{ from: from.current }}>
          Reviews
        </Link>
      </nav>

      <Suspense fallback={<p>Loading...</p>}>
        <Routes>
          <Route path="/cast" element={<MovieCast />} />
          <Route path="/reviews" element={<MovieReviews />} />
        </Routes>
      </Suspense>
    </div>
  );
};


export default MovieDetailsPage;
