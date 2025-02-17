import { Router } from "express";
import furnitureService from "../services/furnitureService.js";

const furnitureController = Router();

furnitureController.get("/", async (req, res) => {
  const query = req.query;
  const allFurniture = await furnitureService.getAll(query);
  res.json(allFurniture);
});

furnitureController.post("/", async (req, res) => {
  const furnitureData = req.body;
  console.log(req.header("x-authorization"));

  const userId = req.user._id;
  furnitureData._ownerId = userId;

  const newItem = await furnitureService.create(furnitureData);
  res.json(newItem);
});

furnitureController.get("/:furnitureId", async (req, res) => {
  const furnitureId = req.params.furnitureId;
  const furniture = await furnitureService.getOne(furnitureId);
  res.json(furniture);
});

furnitureController.delete("/:furnitureId", async (req, res) => {
  const furnitureId = req.params.furnitureId;
  await furnitureService.del(furnitureId);
  res.status(204).end();
});

furnitureController.put("/:furnitureId", async (req, res) => {
  const furnitureId = req.params.furnitureId;
  const furnitureData = req.body;
  const newFurniture = await furnitureService.update(
    furnitureId,
    furnitureData
  );
  res.json(newFurniture);
});

export default furnitureController;
