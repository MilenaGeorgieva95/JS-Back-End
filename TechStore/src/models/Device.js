import { Schema, model, Types } from "mongoose";

const deviceSchema = new Schema(
  {
    brand: { type: String, required: true },
    model: { type: String, required: false },
    hardDisk: { type: String, required: false },
    screenSize: { type: String, required: false },
    ram: { type: String, required: false },
    operatingSystem: { type: String, required: false },
    cpu: { type: String, required: false },
    gpu: { type: String, required: false },
    price: { type: Number, required: false },
    color: { type: String, required: false },
    weight: { type: String, required: false },
    image: { type: String, required: false },

    preferredList: [
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

const Device = model("Device", deviceSchema);

export default Device;
