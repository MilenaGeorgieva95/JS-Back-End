import movies from "../../movies.js";

function findMovieById(id) {
  return movies.find((movie) => movie.id === id);
}

const movieServices = { findMovieById };

export default movieServices;
