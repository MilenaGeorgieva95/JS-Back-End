import { Schema, Types, model } from "mongoose";

const furnitureSchema = new Schema({
  make: String,
  model: String,
  year: Number,
  description: String,
  price: Number,
  img: String,
  material: String,
  _ownerId: {
    type: Types.ObjectId,
    ref: "User",
  },
});

const Furniture = model("Furniture", furnitureSchema);

export default Furniture;
