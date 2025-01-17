import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.render("home");
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

router.get("*", (req, res) => {
  res.render("404");
});

export default router;
