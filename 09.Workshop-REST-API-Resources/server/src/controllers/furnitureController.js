import { Router } from "express";
import furnitureService from "../services/furnitureService.js";

const furnitureController = Router();

furnitureController.get("/", async (req, res) => {
  const allFurniture = await furnitureService.getAll();
  res.json(allFurniture);
});

furnitureController.post("/", async (req, res) => {
  const furnitureData = req.body;
  const newItem = await furnitureService.create(furnitureData);
  res.json(newItem);
});

export default furnitureController;
