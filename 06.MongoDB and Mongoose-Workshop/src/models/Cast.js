import { Schema, model } from "mongoose";

const castSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  birthYear: {
    type: Number,
    required: true,
    max: 2025,
    min: 1700,
  },
  birthplace: {
    type: String,
    required: true,
  },
  imageURL: {
    type: String,
    required: true,
  },
  //http/https validation
});
//*nameInMovie: String, required
//*movie: ObjectId, ref Movie Model

const Cast = model("Cast", castSchema);

export default Cast;
