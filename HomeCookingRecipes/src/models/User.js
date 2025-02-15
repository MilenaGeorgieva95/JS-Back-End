import { Schema, model, Types } from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new Schema({
  username: {
    type: String,
    required: [true, "Username is required!"],
minLength: 2,
maxLength:20
  },
  email: {
    type: String,
    required: [true, "Email is required!"],
    unique: true,
    minLength:10
  },
  password: {
    type: String,
    required: [true, "Password is required!"],
    minLength: 4
  },

});

const saltRounds = 10;
userSchema.pre("save", async function () {
  this.password = await bcrypt.hash(this.password, saltRounds);
});

const User = model("User", userSchema);

export default User;
