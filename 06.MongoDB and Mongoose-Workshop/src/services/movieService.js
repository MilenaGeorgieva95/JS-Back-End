import Movie from "../models/Movie.js";

function getAllMovies(filter = {}) {
  let movies = Movie.find({});
  if (filter.title) {
    movies = movies.find({ title: filter.title });
  }
  if (filter.genre) {
    movies = movies.find({ genre: filter.genre });
  }
  if (filter.year) {
    movies = movies.find({ year: Number(filter.year) });
  }
  return movies;
}

function findMovieById(id) {
  return Movie.find({ _id: id });
}

function getStars(rating) {
  let stars = [];
  for (let i = 0; i < Math.round(Number(rating)); i++) {
    stars.push(1);
  }
  return stars;
}

function createMovie(movieData) {
  const movie = Movie.create({
    ...movieData,
    rating: Number(movieData.rating),
    year: Number(movieData.year),
  });
  return movie;
}

const movieServices = {
  getAllMovies,
  findMovieById,
  getStars,
  createMovie,
};

export default movieServices;
