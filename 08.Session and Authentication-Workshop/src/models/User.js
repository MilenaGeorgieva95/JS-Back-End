import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new Schema({
  email: String,
  password: String,
});

//pre validate post => pre save post
userSchema.pre('save', async function (){
    console.log(this._id)
    this.password = await bcrypt.hash(this.password, 10);
});

const User = model("User", userSchema);

export default User;


