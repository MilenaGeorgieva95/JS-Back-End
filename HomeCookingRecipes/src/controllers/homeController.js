import { Router } from "express";
import recipesService from "../services/recipesService.js";

const homeController = Router();

homeController.get("/", async (req, res) => {
 const recipes= await recipesService.getLatest3()
  res.render("home", {recipes});
});

homeController.get("/about", async (req, res) => {
  res.render("about");
});

export default homeController;
