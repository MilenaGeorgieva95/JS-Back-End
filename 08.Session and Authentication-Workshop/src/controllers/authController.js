import { Router } from "express";
import authService from "../services/authService.js";

const authController = Router();

authController.get("/register", (req, res) => {
  res.render("auth/register");
});

authController.post("/register", async (req, res) => {
  const userData = req.body;
  const newUser = await authService.register(userData);
  console.log(newUser);
  res.redirect("/");
});

authController.get("/login", (req, res) => {
  res.render("auth/login");
});

export default authController;
