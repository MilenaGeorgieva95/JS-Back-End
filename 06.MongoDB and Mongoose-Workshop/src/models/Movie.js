import { Schema, model, Types } from "mongoose";

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
  //foreign key setup
  casts: [
    {
      type: Types.ObjectId,
      ref: "Cast",
    },
  ],
});

//'Movies' name in the DB
const Movie = model("Movie", movieSchema);

export default Movie;
