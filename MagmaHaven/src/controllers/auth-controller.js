import { Router } from "express";
import authService from "../services/auth-service.js";

const authController = Router();

authController.get("/register", (req, res) => {
  res.render("auth/register", { title: "Register Page" });
});

authController.post("/register", async (req, res) => {
  const { username, email, password, repass } = req.body;

  try {
    const token=await authService.register(username, email, password, repass);
    res.cookie('auth', token, {httpOnly: true})
    res.redirect("/");
  } catch (error) {
    // const errorMessage = err.errors ? Object.values(err.errors)[0]?.message : err.message;
    const errorMessage = error.message;
    res.render("auth/register", {
      error: errorMessage,
      username,
      email,
    });
  }
});

authController.get("/login", (req, res) => {
  res.render("auth/login", { title: "Login Page" });
});

authController.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const token = await authService.login(email, password);
    res.cookie("auth", token, {httpOnly: true});
    res.redirect("/");
  } catch (error) {
    const errorMessage = error.message;
    res.render("auth/login", { email, error: errorMessage });
  }
});

authController.get("/logout", (req, res) => {
  res.clearCookie('auth')
  res.redirect('/');
});

export default authController;
