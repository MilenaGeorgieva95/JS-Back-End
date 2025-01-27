import Cast from "../models/Cast.js";

function create(castData) {
    const newMovie=Cast.create(castData)
  return newMovie;
}

function getAll(){
  return Cast.find({});
}

const castService = {
  create,
  getAll,
};

export default castService;
