import { Schema, model } from "mongoose";

const userSchema = new Schema({
  username: {
    type: String,
    required: [true, "Username is required!"],
  },
  email: {
    type: String,
    required: [true, 'Email is required!'],
    unique: true,
    minLength: [10, "Email is too short!"],
    validate: [/@[A-Za-z0-9]+.[A-Za-z0-9]+$/, "Invalid email address!"],
  },
  password: {
    type: String,
    required: [true, 'Password is required!'],
    minLength: [6, "Password is too short!"],
    maxLength: [20, "Maximum 20 characters!"],
    validate: [/^[A-Za-z0-9]+$/, "Invalid password!"],
  },
});

const User = model("User", userSchema);

export default User;
