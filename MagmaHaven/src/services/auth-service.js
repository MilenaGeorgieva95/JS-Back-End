import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

async function register(username, email, password, repass) {
  if (!username || !email || !password || !repass) {
    throw new Error("All fields are required!");
  }

  if (password !== repass) {
    throw new Error("Passwords don't match!");
  }

  username = username.toLowerCase();
  const user = await User.findOne({ $or: [{ username }, { email }] });
  if (user) {
    throw new Error("User already exists!");
  }
  const newUser = await User.create({ username, email, password });
  return generateToken(newUser);
}

async function login(email, password) {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("Email or password doesn't exist!");
  }
  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    throw new Error("Email or password doesn't exist!");
  }
  return generateToken(user);
}

async function generateToken(user) {
  const payload = {
    username: user.username,
    email: user.email,
    _id: user._id,
  };
  const token = await jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "2h",
  });
  return token;
}

export default {
  register,
  login,
  generateToken,
};
