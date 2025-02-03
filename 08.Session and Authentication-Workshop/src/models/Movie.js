import { Schema, model, Types } from "mongoose";

const movieSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Movie title is required!'],
    minLength: 5,
    validate: [
      /^[A-Za-z0-9 ]+$/,
      "Title can contain only alphanumeric characters!",
    ],
  },
  category: {
    type: String,
    required: [true,'Category is required!'],
    minLength: 5,
  },
  genre: {
    type: String,
    required: true,
    minLength: 5,
    lowercase: true,
    validate: [
      /^[A-Za-z0-9 ]+$/,
      "Genre can contain only alphanumeric characters!",
    ],
  },
  director: {
    type: String,
    required: true,
    minLength: 5,
    validate: [
      /^[A-Za-z0-9 ]+$/,
      "Director can contain only alphanumeric characters!",
    ],
  },
  year: {
    type: Number,
    required: true,
    min: [1900, "Cannot add movies created before 1900!"],
    max: [2050, "Cannot add movies created after 2050!"],
  },
  imageURL: {
    type: String,
    validate: [/^https?:\/\//, "Invalid image url!"],
  },
  rating: {
    type: Number,
    validate: {
      validator: function (ratingValue) {
        if (thisthis.year >= 2000) {
          return !!ratingValue;
        }
        return true;
      },
      message: 'Rating is required for movies after year 2000!'
    },
    min: [1, "Rating should be at least 1!"],
    max: [5, "Rating cannot be higher than 5!"],
  },
  description: {
    type: String,
    required: true,
    minLength: [20, "Description should be at least 20 characters long!"],
    validate: [
      /^[A-Za-z0-9 ]+$/,
      "Description can contain only alphanumeric characters!",
    ],
  },
  alt: String,
  //foreign key setup
  casts: [
    {
      type: Types.ObjectId,
      ref: "Cast",
    },
  ],
  owner: {
    type: Types.ObjectId,
    ref: "User",
  },
});

//'Movies' name in the DB
const Movie = model("Movie", movieSchema);

export default Movie;
