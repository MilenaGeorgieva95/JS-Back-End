import { Router } from "express";
import authService from "../services/authService.js";
import { isAuth } from "../middlewares/authMiddleware.js";

const authController = Router();

authController.get("/register", (req, res) => {
  res.render("auth/register");
});

authController.post("/register", async (req, res) => {
  const {email, password, repass} = req.body;
  if(password!==repass){
    return res.status(400).end();
  }
  try {
    await authService.register(email, password, repass);
  } catch (err) {
    console.log(err);
   return res.redirect('/auth/register');
  }
  res.redirect("/auth/login");
});

authController.get("/login", (req, res) => {
  res.render("auth/login");
});

authController.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const token = await authService.login(email, password);
    res.cookie("auth", token, {httpOnly: true});
    res.redirect("/");
  } catch (err) {
    console.log(err);
    res.redirect("/404");
  }
});

authController.get("/logout", isAuth, (req,res)=>{
  res.clearCookie('auth');
  res.redirect('/');
})

export default authController;
