import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    minLength:[10, 'Email is too short!'],
  },
  password: {
    type: String,
    required: true,
    minLength:[6, 'Password is too short!'],
    maxLength: [20, 'Maximum 20 characters!']
  },
});

//pre validate post => pre save post
userSchema.pre("save", async function () {
  this.password = await bcrypt.hash(this.password, 10);
});

const User = model("User", userSchema);

export default User;
