import { Router } from "express";
import movieServices from "../services/movieService.js";

const movieController = Router();

movieController.get("/create", (req, res) => {
  res.render("create");
});

movieController.post("/create", (req, res) => {
  const newMovieId = movieServices.createMovie(req.body);
  res.redirect(`/movies/${newMovieId}/details`);
});

movieController.get("/search", (req, res) => {
  const filter = req.query;

  const movies = movieServices.getAllMovies(filter);
  res.render("search", { movies, filter });
});

// movieController.post("/search", (req, res) => {
//   const searchParams=req.body;
//   const movies=movieServices.findMovieByParams(searchParams);
//   res.render("search", {movies});
// });

movieController.get("/:movieId/details", (req, res) => {
  const movie = movieServices.findMovieById(req.params.movieId);
  movie.stars = movieServices.getStars(movie.rating);
  res.render("details", movie);
});

export default movieController;
