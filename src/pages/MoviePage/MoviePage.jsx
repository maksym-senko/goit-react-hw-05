import React, { useState } from 'react';
import axios from 'axios';
import MovieList from '../../components/MovieList/MovieList';
import style from './MoviePage.module.css';

 
const MoviesPage = () => {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);

  const handleSearch = (e) => {
    e.preventDefault();
    axios
      .get('https://api.themoviedb.org/3/search/movie', {
        params: { api_key: 'd824e721c403a45e0ad4663b682ad065', query },
      })
      .then((response) => setMovies(response.data.results))
      .catch((error) => console.error('Error searching movies:', error));
  };


  return (
    <div>
      <h1>Search Movies</h1>
      <form className={style.formContainer} onSubmit={handleSearch}>
        <input
          className={style.searchInput}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for a movie..."
        />
        <button className={style.btnSearch} type="submit">Search</button>
      </form>
      <MovieList movies={movies} />
    </div>
  );
};


export default MoviesPage;
