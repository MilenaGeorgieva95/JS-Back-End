import { Schema, model, Types } from "mongoose";

const recipeSchema = new Schema(
  {
    title: { type: String, required: true, minLength: 2 },
    ingredients: {
      type: String,
      required: true,
      minLength: 10,
      maxLength: 200,
    },
    instructions: { type: String, required: true, minlength: 10 },
    description: {
      type: String,
      required: true,
      minLength: 10,
      maxLength: 100,
    },
    image: {
      type: String,
      required: true,
      validate: [/^https?:\/\//, "Invalid image url!"],
    },

    recommendList: [
      {
        type: Types.ObjectId,
        ref: "User",
      },
    ],
    //- a collection of Users (a reference to the User model)

    owner: {
      type: Types.ObjectId,
      ref: "User",
    },
    //- object ID (a reference to the User model)
  },
  {
    timestamps: true,
  }
);

const Recipe = model("Recipe", recipeSchema);

export default Recipe;
