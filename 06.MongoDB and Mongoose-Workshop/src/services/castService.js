import Cast from "../models/Cast.js";

function create(castData) {
    const newMovie=Cast.create(castData)
  return newMovie;
}

function getAll(filter=[]){
  return Cast.find({_id: {$nin: filter}});
}

const castService = {
  create,
  getAll,
};

export default castService;
