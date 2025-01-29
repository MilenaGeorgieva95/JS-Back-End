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
  return Movie.findOne({ _id: id });
}

function findMovieByIdWithCast(id) {
  return Movie.findOne({ _id: id }).populate("casts");
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

//Attach 1
async function attachCast(movieId, castId) {
  const movie = await findMovieById(movieId);
  movie.casts.push(castId);
  return await movie.save();
}
//Attach 2
async function attachAndUpdate(movieId, castId) {
  return Movie.findByIdAndUpdate(movieId, { $push: { casts: castId } });
}

const movieServices = {
  getAllMovies,
  findMovieById,
  findMovieByIdWithCast,
  getStars,
  createMovie,
  attachCast,
  attachAndUpdate,
};

export default movieServices;
