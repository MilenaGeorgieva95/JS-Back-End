import User from "../models/user.js";

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
  return User.create({ username, email, password });
}

export default {
  register,
};
