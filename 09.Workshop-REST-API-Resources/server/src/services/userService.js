import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const secret = "MYSECRET";

const userService = {
  register(email, password) {
    //Check if user exists

    return User.create({ email, password });
  },
  async login(email, password) {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("Invalid user or password!");
    }
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      throw new Error("Invalid user or password!");
    }
    const payload = {
      _id: user._id,
      email,
    };
    const token = jwt.sign(payload, secret, { expiresIn: "2h" });

    const result = {
      _id: user._id,
      email,
      accessToken: token,
    };
    return result;
  },
};

export default userService;
