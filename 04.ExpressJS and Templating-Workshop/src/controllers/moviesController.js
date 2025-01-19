import { Router } from "express";

const movieController = Router();

movieController.get("/create", (req, res) => {
  res.render("create");
});

movieController.get("/search", (req, res) => {
  res.render("search");
});

movieController.get("/details/:movieId", (req, res) => {
  res.render("details");
});

export default movieController;
