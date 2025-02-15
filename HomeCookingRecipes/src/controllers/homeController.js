import { Router } from "express";

const homeController = Router();

homeController.get("/", async (req, res) => {
  // res.setError('Home error test')
  res.render("home");
});

homeController.get("/about", async (req, res) => {
  res.render("about");
});

export default homeController;
