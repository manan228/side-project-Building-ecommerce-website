import React, { useEffect, useState } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';
import AddMovie from './components/AddMovie';

function App() {

  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null)

  useEffect(() => {

    fetchMovieHandler();
  }, [])

  async function addMovieHandler(movie) {

    const response = await fetch('https://react-http-b7832-default-rtdb.firebaseio.com/movies.json', {
      method: 'POST',
      body: JSON.stringify(movie),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const data = await response.json();
    console.log(data);
  }

  async function fetchMovieHandler() {

    setIsLoading(true)
    setError(null)
    
    try {

      const response = await fetch('https://react-http-b7832-default-rtdb.firebaseio.com/movies.json')
      if (!response.ok) {
        throw new Error('Somwthing went wrong!');
      }
      const data = await response.json();

      const loadedMovies = [];

      for(const key in data) {
        loadedMovies.push({
          id: KeyboardEvent,
          title: data[key].title,
          openingText: data[key].openingText,
          releaseDate: data[key].releaseDate,
        })
      }
    setMovies(loadedMovies);
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
        <AddMovie onAddMovie={addMovieHandler}/>
      </section>
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
