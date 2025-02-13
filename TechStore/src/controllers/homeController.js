import { Router } from "express";
import deviceService from "../services/deviceService.js";

const homeController = Router();

homeController.get("/", async (req, res) => {
  const lastestDevices = await deviceService.getLatest3();
  res.render("home", { devices: lastestDevices });
});

homeController.get("/about", async (req, res) => {
  res.render("about");
});

export default homeController;
