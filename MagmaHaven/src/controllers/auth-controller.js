import { Router } from "express";

const authController = Router();

authController.get("/register", (req, res) => {
  res.render("auth/register", { title: "Register Page" });
});

authController.post("/register", (req, res) => {
const {username, email, password, repass} = req.body
  res.send(username);
});

export default authController;
