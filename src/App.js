import React, { useState, useEffect, useCallback } from "react";
import MoviesList from "./components/MoviesList";
import "./App.css";
import MoviForm from "./components/MoviForm";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [retryTimer, setRetryTimer] = useState(null);

  const fetchMovies = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        "https://react-8a296-default-rtdb.firebaseio.com/movies.json"
      );

      if (!response.ok) {
        throw new Error("Something went wrong! Retrying...");
      }

      const data = await response.json();

      const loadedMovies = [];

      for (const key in data) {
        loadedMovies.push({
          id: key,
          title: data[key].title,
          text: data[key].text,
          date: data[key].date,
        });
      }

      setMovies(loadedMovies);
    } catch (error) {
      setError(error.message);

      const retryTimer = setTimeout(() => {
        fetchMovies();
      }, 5000);
      setRetryTimer(retryTimer);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  const cancelRetryHandler = () => {
    clearTimeout(retryTimer);
  };

  const addMovieHandler = async (movie) => {
    try {
      const response = await fetch(
        "https://react-8a296-default-rtdb.firebaseio.com/movies.json",
        {
          method: "POST",
          body: JSON.stringify(movie),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to add movie.");
      }

      fetchMovies();
    } catch (error) {
      setError(error.message);
    }
  };

  const deleteMovieHandler = async (id) => {
    try {
      const response = await fetch(
        `https://react-8a296-default-rtdb.firebaseio.com/movies/${id}.json`,
        {
          method: "DELETE",
          body: JSON.stringify(movies),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete movie.");
      }

      fetchMovies();
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <React.Fragment>
      <MoviForm onAddMovie={addMovieHandler} />
      <section>
        <button onClick={fetchMovies} disabled={isLoading}>
          Fetch Movies
        </button>
        {isLoading && <h1>Loading...</h1>}
      </section>
      <section>
        <MoviesList movies={movies} onDeleteMovie={deleteMovieHandler} />
        {!isLoading && movies.length === 0 && !error && <p>Found no movies.</p>}
        {!isLoading && error && (
          <p>
            {error}{" "}
            <button onClick={cancelRetryHandler}>Cancel Retrying</button>
          </p>
        )}
      </section>
    </React.Fragment>
  );
}

export default App;