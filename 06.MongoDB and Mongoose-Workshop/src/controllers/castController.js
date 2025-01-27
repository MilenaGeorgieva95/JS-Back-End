import { Router } from "express";
import castService from "../services/castService.js";
// import castServices from "../services/castService.js";
const castController = Router();

castController.get("/create", (req, res) => {
  res.render("cast/create");
});

castController.post("/create", async (req, res) => {
const castData=req.body;
const newCast= await castService.create(castData);
console.log(newCast);


  res.render("cast/create");
});


export default castController;
