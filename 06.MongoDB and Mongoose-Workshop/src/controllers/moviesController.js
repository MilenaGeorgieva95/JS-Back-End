import { Router } from "express";
import movieServices from "../services/movieService.js";
import castService from "../services/castService.js";

const movieController = Router();

movieController.get("/create", (req, res) => {
  res.render("movie/create");
});

movieController.post("/create", async (req, res) => {
  const movieData=req.body;
  movieData.alt=movieData.title;
  const newMovie= await movieServices.createMovie(movieData); 
  res.redirect(`/movies/${newMovie._id}/details`);
});

movieController.get("/search", async (req, res) => {
  const filter = req.query;

  const movies = await movieServices.getAllMovies(filter).lean();
  res.render("movie/search", { movies, filter });
});

// movieController.post("/search", (req, res) => {
//   const searchParams=req.body;
//   const movies=movieServices.findMovieByParams(searchParams);
//   res.render("search", {movies});
// });

movieController.get("/:movieId/details", async (req, res) => {
  const movie = await movieServices.findMovieById(req.params.movieId).lean();
  movie.stars = movieServices.getStars(movie.rating);
  res.render("movie/details", movie);
});

movieController.get("/:movieId/attach-cast", async (req, res) => {
  const movieId=req.params.movieId;
  const movie= await movieServices.findMovieById(movieId).lean();
const casts= await castService.getAll().lean();
  res.render("cast/attach", {movie, casts});
});

movieController.post("/:movieId/attach-cast", async (req, res) => {
  const movieId=req.params.movieId;
  const movie= await movieServices.findMovieById(movieId)
const castId=req.body.cast
console.log(castId)
const attachedToMovie=await movieServices.attachCast(movieId, castId);
  res.redirect(`/movies/${movieId}/details`);
});


export default movieController;
