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

movieController.get("/:movieId/details", async (req, res) => {
  const [movie] = await movieServices.findMovieById(req.params.movieId).lean();
  movie.stars = movieServices.getStars(movie.rating);
  console.log(movie)
  res.render("details", movie);
});

export default movieController;
