import { Schema, model, Types } from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new Schema({
  username: {
    type: String,
    required: [true, "Username is required!"],
    validate: [/^[A-Za-z0-9-.]+$/, "Invalid username!"],
  },
  email: {
    type: String,
    required: [true, "Email is required!"],
    unique: true,
    minLength: [5, "Email is too short!"],
    validate: [/@[A-Za-z0-9]+.[A-Za-z0-9]+$/, "Invalid email address!"],
  },
  password: {
    type: String,
    required: [true, "Password is required!"],
    minLength: [4, "Password is too short!"],
    maxLength: [20, "Maximum 20 characters!"],
    validate: [/^[A-Za-z0-9]+$/, "Invalid password!"],
  },
});

const saltRounds = 10;
userSchema.pre("save", async function () {
  this.password = await bcrypt.hash(this.password, saltRounds);
});

const User = model("User", userSchema);

export default User;
