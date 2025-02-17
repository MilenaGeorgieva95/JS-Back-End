import Furniture from "../models/Furniture.js";
import querystring from "querystring";

const furnitureService = {
  getAll(filter = {}) {
    const query = Furniture.find({});
    if (filter.where) {
      // const ownerId = filter.where.slice(10, -1);
      const qs = querystring.parse(filter.where.replaceAll('"', ""));
      // qs = _ownerId: ididid123
      query.find(qs);
    }
    return query;
  },
  create(furnitureData) {
    return Furniture.create(furnitureData);
  },
  getOne(furnitureId) {
    return Furniture.findById(furnitureId);
  },
  del(furnitureid) {
    return Furniture.findByIdAndDelete(furnitureid);
  },
  update(furnitureId, furnitureData) {
    return Furniture.findByIdAndUpdate(furnitureId, furnitureData);
  },
};

export default furnitureService;
