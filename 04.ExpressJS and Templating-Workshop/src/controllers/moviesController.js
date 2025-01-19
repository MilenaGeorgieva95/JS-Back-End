import { Router } from "express";
import movieServices from "../services/movieService.js";

const movieController = Router();

movieController.get("/create", (req, res) => {
  res.render("create");
});

movieController.get("/search", (req, res) => {
  res.render("search");
});

movieController.get("/:movieId/details", (req, res) => {
  const movie = movieServices.findMovieById(req.params.movieId);
  res.render("details", movie);
});

export default movieController;
