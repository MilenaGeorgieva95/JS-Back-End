import { Router } from "express";

const authController = Router();

authController.get("/register", (req, res) => {
  res.render("auth/register", { title: "Register Page" });
});

authController.post("/register", (req, res) => {
const {username, email, password, repass} = req.body
  res.send(username);
});

authController.get("/login", (req, res) => {
  res.render("auth/login", { title: "Login Page" });
});

authController.post("/login", (req, res) => {
const {email, password} = req.body
  res.send(email);
});

export default authController;
