import React from 'react';

import Movie from './Movie';
import classes from './MoviesList.module.css';

const MovieList = (props) => {
  return (
    <ul className={classes['movies-list']}>
      {props.movies.map((movie) => (
        <Movie
          key={movie.id}
          title={movie.title}
          date={movie.date}
          text={movie.text}
          deletingMovie = {props.onDeleteMovie}
          movieId = {movie.id}
        />
      
      ))
    
      }

    </ul>
  );
};

export default MovieList;
