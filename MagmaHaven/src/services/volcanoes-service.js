import Volcano from "../models/Volcano.js";

async function createVolcano(data, user) {
  data.owner = user._id;
  return Volcano.create(data);
}

const volcanoesService = {
  createVolcano,
};

export default volcanoesService;
