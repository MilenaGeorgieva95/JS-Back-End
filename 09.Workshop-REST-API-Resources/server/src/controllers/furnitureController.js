import { Router } from "express";
import furnitureService from "../services/furnitureService.js";
import { getErrorMessage } from "../utils/errorUtil.js";

const furnitureController = Router();

furnitureController.get("/", async (req, res) => {
  const query = req.query;
  const allFurniture = await furnitureService.getAll(query);
  res.json(allFurniture);
});

furnitureController.post("/", async (req, res) => {
  const furnitureData = req.body;

  const userId = req.user._id;
  furnitureData._ownerId = userId;
try {
  const newItem = await furnitureService.create(furnitureData);
  res.json(newItem);
} catch (err) {
  const error = getErrorMessage(err)
  res.status(400).json({message:error})
}

});

furnitureController.get("/:furnitureId", async (req, res) => {
  const furnitureId = req.params.furnitureId;
  const furniture = await furnitureService.getOne(furnitureId);
  res.json(furniture);
});

furnitureController.delete("/:furnitureId", async (req, res) => {
  const furnitureId = req.params.furnitureId;
  try{
  await furnitureService.del(furnitureId);
  res.status(204).end();
} catch (err) {
  const error = getErrorMessage(err)
  res.status(400).json({message:error})
}
});

furnitureController.put("/:furnitureId", async (req, res) => {
  const furnitureId = req.params.furnitureId;
  const furnitureData = req.body;
  try{
  const newFurniture = await furnitureService.update(
    furnitureId,
    furnitureData
  );
  res.json(newFurniture);
} catch (err) {
  const error = getErrorMessage(err)
  res.status(400).json({message:error})
}
});

export default furnitureController;
