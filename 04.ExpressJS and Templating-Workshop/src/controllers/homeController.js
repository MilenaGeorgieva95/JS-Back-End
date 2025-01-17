import express from "express";
import movies from "../../movies.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.render("home", { movies });
});

router.get("/create", (req, res) => {
  res.render("create");
});

router.get("/search", (req, res) => {
  res.render("search");
});

router.get("/about", (req, res) => {
  res.render("about");
});

router.get("/details/:movieId", (req, res) => {
  res.render("details");
});

export default router;
