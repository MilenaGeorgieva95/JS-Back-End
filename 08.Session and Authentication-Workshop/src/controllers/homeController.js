import express from "express";
import movieServices from "../services/movieService.js";

const router = express.Router();

router.get("/", async (req, res) => {
  //lean has to be called before await
  const movies = await movieServices.getAllMovies().lean();

  // const moviesObjs = movies.map((m) => m.toObject());
  // res.render("home", { movies: moviesObjs });

  res.render("home", { movies });
});

router.get("/about", (req, res) => {
  res.render("about");
});

export default router;
