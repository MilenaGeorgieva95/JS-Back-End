import { Router } from "express";
import deviceService from "../services/deviceService.js";
import { isUser } from "../middlewares/authMiddleware.js";

const homeController = Router();

homeController.get("/", async (req, res) => {
  res.setError('Home error test')
  const lastestDevices = await deviceService.getLatest3();
  res.render("home", { devices: lastestDevices });
});

homeController.get("/about", async (req, res) => {
  res.render("about");
});

homeController.get("/profile", isUser, async (req, res) => {
const createdLaptops = await deviceService.getDevicesByOwner(req.user.id);
const prefLaptops = await deviceService.getPrefDevicesByUser(req.user.id)
  res.render("profile", {createdLaptops, prefLaptops });
});

export default homeController;
