import { Router } from "express";
import castService from "../services/castService";
// import castServices from "../services/castService.js";
const castController = Router();

castController.get("/create", (req, res) => {
  res.render("cast/create");
});

castController.post("/create", async (req, res) => {
const castData=req.body;
const newCast=castService.create(castData);

  res.render("cast/create");
});

export default castController;
