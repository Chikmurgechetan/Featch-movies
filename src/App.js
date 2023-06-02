import React, { useState, useEffect, useCallback } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";
import MoviForm from "./components/MoviForm";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [retryTimer, setRetryTimer] = useState(null);
  const [check, setCheck] = useState(false);

  const fetchMovies = useCallback(async() => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch("https://swapi.dev/api/films/");
      if (!response.ok) {
        throw new Error("Something went wrong! Retrying...");
      }

      const data = await response.json();

      const transformedMovies = data.results.map((movieData) => {
        return {
          id: movieData.episode_id,
          title: movieData.title,
          openingText: movieData.opening_crawl,
          releaseDate: movieData.release_date,
        };
      });
      setMovies(transformedMovies);
    } catch (error) {
      setError(error.message);

      const retryTimer = setTimeout(() => {
        fetchMovies();
      }, 5000);
      setRetryTimer(retryTimer);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  const cancelRetryHandler = () => {
    clearTimeout(retryTimer);
    setCheck(false);
  };

  return (
    <React.Fragment>
     <MoviForm/>
      <section>
     <button onClick={fetchMovies} disabled={isLoading}>
          Fetch Movies
        </button>
        {isLoading && <h1>Loading...</h1>}
      </section>
      <section>
        <MoviesList movies={movies} />
        {check && !isLoading && error && (
          <p>
            {error}{" "}
            <button onClick={cancelRetryHandler}>Cancel Retrying</button>
          </p>
        )}
        {!isLoading && movies.length === 0 && !error && <p>Found no movies.</p>}
        {!check && !isLoading && error && <p>Nothing to Show</p>}
      </section>
    </React.Fragment>
  );
}

export default App;
