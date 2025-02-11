import { Router } from "express";
import userService from "../services/userService.js";

const userController = Router();

userController.post("/register", async (req, res) => {
  const { email, password } = req.body;
  const user = await userService.register(email, password);

  res.json({
    _id: user._id,
    email,
    accessToken: "",
  });

  userController.post("/login", async (req, res) => {
    const { email, password } = req.body;
    const result = await userService.login(email, password);
    res.json(result);
  });
});

export default userController;
