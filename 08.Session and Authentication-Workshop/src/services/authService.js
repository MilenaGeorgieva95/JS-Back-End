import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import 'dotenv/config';

const SECRET = process.env.JWT_SECRET

function register(userData) {
  return User.create(userData);
}

async function login(email, password) {
  //Check if user exists
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("Invalid email or password!");
  }
  //Check password is correct
  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    throw new Error("Invalid email or password!");
  }
  //Generate token
  const payload={
    _id: user._id,
    email: user.email
  }
const token = jwt.sign(payload, SECRET, ({expiresIn: '2h'}))
  //return token
return token;
}

const authService = {
  register,
  login,
};

export default authService;
