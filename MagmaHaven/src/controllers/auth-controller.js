import { Router } from "express";
import authService from "../services/auth-service.js";

const authController = Router();

authController.get("/register", (req, res) => {
  res.render("auth/register", { title: "Register Page" });
});

authController.post("/register", async (req, res) => {
  const { username, email, password, repass } = req.body;

  try {
    await authService.register(username, email, password, repass);
    res.redirect("/auth/login");
  } catch (error) {
    // const errorMessage = err.errors ? Object.values(err.errors)[0]?.message : err.message;
    const errorMessage = error.message;
    res.render("auth/register", {
      error: errorMessage,
      username,
      email,
      password,
    });
  }
});

authController.get("/login", (req, res) => {
  res.render("auth/login", { title: "Login Page" });
});

authController.post("/login", (req, res) => {
  const { email, password } = req.body;
  res.send(email);
});

export default authController;
