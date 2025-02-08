import User from "../models/User.js";

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
  return User.create(userData);
}

const authService = {
  register,
};

export default authService;
