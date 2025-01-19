import movies from "../../movies.js";

function findMovieById(id) {
  return movies.find((movie) => movie.id === id);
}

function getStars(rating) {
  let stars = [];
  for (let i = 0; i < Math.round(rating); i++) {
    stars.push(1);
  }
  return stars;
}

const movieServices = { findMovieById, getStars };

export default movieServices;
