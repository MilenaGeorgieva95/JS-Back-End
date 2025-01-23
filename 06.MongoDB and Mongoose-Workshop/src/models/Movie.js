import { Schema, model } from "mongoose";

const movieSchema = new Schema({
  title: String,
  categor: String,
  genre: String,
  director: String,
  year: Number,
  imageURL: String,
  rating: Number,
  description: String,
});

//'Movie' name in the DB
const Movie = model('Movie', movieSchema);

export default Movie;
