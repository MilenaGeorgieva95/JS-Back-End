import { Router } from "express";
import movieServices from "../services/movieService.js";
import castService from "../services/castService.js";
import getCategories from "../helpers/categories-helper.js";

const movieController = Router();

movieController.get("/create", (req, res) => {
  res.render("movie/create");
});

movieController.post("/create", async (req, res) => {
  const movieCreator = req.user._id;
  if (!movieCreator) {
    return res.redirect("/404");
  }
  const movieData = req.body;
  movieData.owner = movieCreator;
  movieData.alt = movieData.title;
  const newMovie = await movieServices.createMovie(movieData);
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
  const movie = await movieServices
    .findMovieByIdWithCast(req.params.movieId)
    .lean();
  movie.stars = movieServices.getStars(movie.rating);
  let isOwner = false;
  if (req.user) {
    isOwner = movie.owner.toString() === req.user._id;
  }
  res.render("movie/details", { movie, isOwner });
});

movieController.get("/:movieId/attach-cast", async (req, res) => {
  const movieId = req.params.movieId;
  const movie = await movieServices.findMovieById(movieId).lean();
  const casts = await castService.getAll(movie.casts).lean();
  res.render("cast/attach", { movie, casts });
});

movieController.post("/:movieId/attach-cast", async (req, res) => {
  const movieId = req.params.movieId;
  const castId = req.body.cast;
  const attachedToMovie = await movieServices.attachCast(movieId, castId);
  res.redirect(`/movies/${movieId}/details`);
});

movieController.get("/:movieId/delete", async (req, res) => {
  const movieId = req.params.movieId;
  const movie = await movieServices.findMovieById(movieId);

  if (movie && movie.owner.toString() === req.user._id) {
    await movieServices.del(movieId);
    return res.redirect("/");
  }

  res.redirect("/404");
});

movieController.get("/:movieId/edit", async (req, res) => {
  const movieId = req.params.movieId;
  const movie = await movieServices.findMovieById(movieId).lean();
  const categories = getCategories(movie.category);
  res.render("movie/edit", { movie, categories });
});

movieController.post("/:movieId/edit", async (req, res) => {
  const movieId = req.params.movieId;
  const newMovieData = req.body;

  const movie = await movieServices.findMovieById(movieId);
  const userId = req.user._id;
  if (movie.owner.toString() !== userId) {
    return res.redirect("/404");
  }

  newMovieData.alt = newMovieData.title;
  await movieServices.updateMovie(movieId, newMovieData);
  res.redirect(`/movies/${movieId}/details`);
});

export default movieController;
