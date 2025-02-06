import Volcano from "../models/Volcano.js";

async function createVolcano(data, user) {
  data.owner = user._id;
  return Volcano.create(data);
}

function getAll(){
  return Volcano.find({});
}

const volcanoesService = {
  createVolcano,
  getAll,
};

export default volcanoesService;
