import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config.js";

async function register(userData) {
  if (userData.password !== userData.rePass) {
    throw new Error("Passwords don't match!");
  }

  const userExists = await User.findOne({ email: userData.email }).select({
    _id: true,
  });
  if (userExists) {
    throw new Error("User already exists!");
  }
  const user = await User.create(userData);
  return generateToken(user);
}

async function login(email, password) {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("Invalid email or password!");
  }
  const isValid = await bcrypt.compare(password, user.password);

  if (!isValid) {
    throw new Error("Invalid email or password!");
  }
  return generateToken(user);
}

function generateToken(user) {
  const payload = {
    id: user.id,
    email: user.email,
    name: user.name,
  };
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "2h" });
  return token;
}

const authService = {
  register,
  login,
};

export default authService;
