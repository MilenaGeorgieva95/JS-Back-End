import Furniture from "../models/Furniture.js";

const furnitureService = {
  getAll() {
    return Furniture.find({});
  },
  create(furnitureData) {
    return Furniture.create(furnitureData);
  },
};

export default furnitureService;
