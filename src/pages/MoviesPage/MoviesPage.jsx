import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import MovieList from '../../components/MovieList/MovieList';
import style from './MoviesPage.module.css';

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';

useEffect(() => {
  if (!query) return;

  axios
    .get('https://api.themoviedb.org/3/search/movie', {
      params: { api_key: 'd824e721c403a45e0ad4663b682ad065', query },
    })
    .then((response) => setMovies(response.data.results))
    .catch((error) => console.error('Error searching movies:', error));
}, [query]);

const handleSearch = (e) => {
  e.preventDefault();

const searchQuery = e.target.elements.query.value.trim();
  if (searchQuery === '') {
    alert('Please enter a search term!');
    return;
}

setSearchParams({ query: searchQuery });
};

return (
    <div className={style.pageContainer}>
      <h1>Search Movies</h1>
      <form className={style.formContainer} onSubmit={handleSearch}>
        <input
          className={style.searchInput}
          type="text"
          name="query"
          defaultValue={query}
          placeholder="Search for a movie..."
        />
        <button className={style.btnSearch} type="submit">Search</button>
      </form>
      {movies.length > 0 ? (
        <MovieList movies={movies} />
      ) : (
        query && <p className={style.moviesPageText}>No movies found for "{query}".</p>
      )}
    </div>
  );
};


export default MoviesPage;
