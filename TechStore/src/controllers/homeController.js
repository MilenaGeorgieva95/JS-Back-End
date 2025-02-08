import { Router } from "express";

const homeController = new Router();

homeController.get("/", (req, res) => {
    res.send("It works");
  });

export default homeController;
