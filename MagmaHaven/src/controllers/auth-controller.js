import { Router } from "express";
import authService from "../services/auth-service.js";

const authController = Router();

authController.get("/register", (req, res) => {
  res.render("auth/register", { title: "Register Page" });
});

authController.post("/register", async (req, res) => {
const {username, email, password, repass} = req.body;

if(password!==repass){
  res.render('auth/register', {error: "Passwords don't match!", username, email, password});
}

try {
  await authService.register(username, email, password);
  res.redirect('/auth/login');
} catch (err) {
  const errorMessage = Object.values(err.errors)[0]?.message; 
  res.render('auth/register', {error: errorMessage, username, email, password})
}
});

authController.get("/login", (req, res) => {
  res.render("auth/login", { title: "Login Page" });
});

authController.post("/login", (req, res) => {
const {email, password} = req.body
  res.send(email);
});

export default authController;
