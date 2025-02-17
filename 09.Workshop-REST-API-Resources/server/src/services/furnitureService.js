import Furniture from "../models/Furniture.js";

const furnitureService = {
  getAll() {
    return Furniture.find({});
  },
  create(furnitureData) {
    return Furniture.create(furnitureData);
  },
  getOne(furnitureId){
    return Furniture.findById(furnitureId)
  }
};

export default furnitureService;
