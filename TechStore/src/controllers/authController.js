import { Router } from "express";
import authService from "../services/authService.js";
import { isGuest, isUser } from "../middlewares/authMiddleware.js";
import { getErrorMessage } from "../utils/errorUtils.js";

const authController = Router();

authController.get("/register", isGuest, (req, res) => {
  res.render("auth/register");
});

authController.post("/register", isGuest, async (req, res) => {
  const userData = req.body;
  try {
    const token = await authService.register(userData);
    res.cookie('auth', token, {httpOnly: true})
    res.redirect("/");
  } catch (err) {
   const errorMessage = getErrorMessage(err);
   res.render("auth/register", {error: errorMessage, userData});
  }
});

authController.get("/login", isGuest, (req, res) => {
  res.render("auth/login");
});

authController.post("/login", isGuest, async (req, res) => {
  const { email, password } = req.body;
  try {
    const token = await authService.login(email, password);
    res.cookie("auth", token, {httpOnly: true});
    res.redirect("/");
  } catch (err) {
    const errorMessage = getErrorMessage(err);
    res.render("auth/login", { error: errorMessage, email});
  }
});

authController.get("/logout", isUser, (req, res) => {
  res.clearCookie('auth');
  res.redirect('/')
});

export default authController;
