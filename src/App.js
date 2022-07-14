import React, { useState } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {

  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('')

  async function fetchMovieHandler() {

    setIsLoading(true)
    setError(null)
    
    try {

      const response = await fetch('https://swapi.dev/api/films/')
      if (!response.ok) {
        throw new Error('Somwthing went wrong!');
      }
      const data = await response.json();

    const transformedMovies = data.results.map((movieData) => {

      return {

        id: movieData.episode_id,
        title: movieData.title,
        openingText: movieData.opening_crawl,
        releaseDate: movieData.release_date
      }
    })
    setMovies(transformedMovies);
    setIsLoading(false)
    }

    catch(error) {
      setError(error.message)
    }
    setIsLoading(false)
    
  }
  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMovieHandler}>Fetch Movies</button>
      </section>
      <section>
        {!isLoading && <MoviesList movies={movies} />}
        {isLoading && <p>Loading...</p>}
        {!isLoading && error && <p>{error}</p>}
      </section>
    </React.Fragment>
  );
}

export default App;
