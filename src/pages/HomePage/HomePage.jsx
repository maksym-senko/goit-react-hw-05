import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MovieList from '../../components/MovieList/MovieList';
import './HomePage.module.css';


const HomePage = () => {
  const [movies, setMovies] = useState([]);

 
  useEffect(() => {
    axios
      .get('https://api.themoviedb.org/3/trending/movie/day', {
        params: { api_key: 'd824e721c403a45e0ad4663b682ad065' },
      })
      .then((response) => setMovies(response.data.results))
      .catch((error) => console.error('Error fetching trending movies:', error));
  }, []);

  return (
    <div>
      <h1>Trending Movies</h1>
      <MovieList movies={movies} />
    </div>
  );
};


export default HomePage;
