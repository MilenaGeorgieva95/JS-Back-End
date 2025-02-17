import { Router } from "express";
import furnitureService from "../services/furnitureService.js";

const furnitureController = Router();

furnitureController.get("/", async (req, res) => {
  const allFurniture = await furnitureService.getAll();
  res.json(allFurniture);
});

furnitureController.post("/", async (req, res) => {
  const furnitureData = req.body;
  console.log(req.header('x-authorization'));

  const userId=req.user._id
  furnitureData._ownerId=userId;

  const newItem = await furnitureService.create(furnitureData);
  res.json(newItem);
});

furnitureController.get("/:furnitureId", async (req, res) => {
  const furnitureId = req.params.furnitureId;
  const furniture = await furnitureService.getOne(furnitureId);
  res.json(furniture);
});

export default furnitureController;
