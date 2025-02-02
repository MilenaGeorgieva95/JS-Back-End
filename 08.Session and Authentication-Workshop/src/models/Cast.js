import { Schema, model } from "mongoose";

const castSchema = new Schema({
  name: {
    type: String,
    required: true,
    validate: [/^[A-Za-z0-9 ]+$/, 'The name can contain only alphanumeric characters!'],
  },
  birthYear: {
    type: Number,
    required: true,
    max: 2025,
    min: 1900,
  },
  birthplace: {
    type: String,
    required: true,
    validate:[/^[A-Za-z0-9 ]+$/, 'The name can contain only alphanumeric characters!'],
  },
  imageURL: {
    type: String,
    validate: [/^https?:\/\//, 'Invalid image url!']
  },

});
//*nameInMovie: String, required
//*movie: ObjectId, ref Movie model

const Cast = model("Cast", castSchema);

export default Cast;
