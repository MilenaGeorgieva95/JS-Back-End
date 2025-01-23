import { Router } from "express";
import movieServices from "../services/movieService.js";

const movieController = Router();

movieController.get("/create", (req, res) => {
  res.render("create");
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
  res.render("details", movie);
});

export default movieController;
