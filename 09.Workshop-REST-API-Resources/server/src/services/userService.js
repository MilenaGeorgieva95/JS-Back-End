import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const secret = "MYSECRET";

const userService = {
  async register(email, password) {
    const user = await User.findOne({ email });
    if (user) {
      throw new Error("User already exists!");
    }

    const newUser = await User.create({ email, password });
    return genLoginRes(newUser);
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
    return genLoginRes(user);
  },
logout (){
    //TODO: invalidate token
    return true;
}
};


function genLoginRes(user) {
  const payload = {
    _id: user._id,
    email: user.email,
  };
  const token = jwt.sign(payload, secret, { expiresIn: "2h" });

  const result = {
    _id: user._id,
    email: user.email,
    accessToken: token,
  };
  return result;
}

export default userService;
