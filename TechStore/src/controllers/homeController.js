import { Router } from "express";

const homeController = new Router();

homeController.get("/", (req, res) => {
    res.render("home");
  });

export default homeController;
