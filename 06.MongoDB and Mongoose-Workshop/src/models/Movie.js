import { Schema, model } from "mongoose";

const movieSchema = new Schema({
  title: String,
  category: String,
  genre: String,
  director: String,
  year: Number,
  imageURL: String,
  rating: Number,
  description: String,
  alt: String,
});

//'Movie' name in the DB
const Movie = model('Movie', movieSchema);

export default Movie;
