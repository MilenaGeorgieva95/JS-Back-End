import Volcano from "../models/Volcano.js";

async function createVolcano(data, user) {
  data.owner = user._id;
  return Volcano.create(data);
}

function getAll(){
  return Volcano.find({});
}

function getOneById(id){
  return Volcano.findById(id)
}

function vote(volcanoId, userId){
  return Volcano.findByIdAndUpdate({_id: volcanoId}, {$push: {voteList: userId}})
}

const volcanoesService = {
  createVolcano,
  getAll,
  getOneById,
  vote
};

export default volcanoesService;
