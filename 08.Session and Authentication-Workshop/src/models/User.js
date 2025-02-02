import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    minLength:[10, 'Email is too short!'],
    validate: [/@[A-Za-z0-9].[A-Za-z0-9]+$/, 'Invalid email address!'],
  },
  password: {
    type: String,
    required: true,
    minLength:[6, 'Password is too short!'],
    maxLength: [20, 'Maximum 20 characters!'],
    validate: [/^[A-Za-z0-9]+$/, 'Invalid password!'],
  },
});

// userSchema.virtual('repass')
// .set(function(value){
// if(value!==this.password){
//   throw new Error("Passwords don't match!")
// }
// });

//pre validate post => pre save post
userSchema.pre("save", async function () {
  this.password = await bcrypt.hash(this.password, 10);
});

const User = model("User", userSchema);

export default User;
