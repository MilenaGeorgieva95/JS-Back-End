import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET

async function register(email, password, repass) {
  const userCount = await User.countDocuments({email});

  if(userCount>0){
    throw new Error('User alredy exists!')
  }
  return User.create({email, password, repass});
}

async function login(email, password) {
  //Check if user exists
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("Invalid email!");
  }
  //Check password is correct
  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    throw new Error("Invalid password!");
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
