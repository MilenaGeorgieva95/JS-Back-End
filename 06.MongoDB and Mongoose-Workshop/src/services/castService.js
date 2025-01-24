import Cast from "../models/Cast.js";

function create(castData) {
    const newMovie=Cast.create(castData)
  return newMovie;
}

const castService = {
  create,
};

export default castService;
