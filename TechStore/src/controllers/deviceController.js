import { Router } from "express";
import { isUser } from "../middlewares/authMiddleware.js";
import { isOwner } from "../middlewares/deviceMiddleware.js";
import deviceService from "../services/deviceService.js";
import { getErrorMessage } from "../utils/errorUtils.js";
import getUserType from "../utils/userTypes.js";

const deviceController = Router();

deviceController.get("/", async (req, res) => {
  const allDevices = await deviceService.getAll();
  res.render("devices/catalog", { devices: allDevices });
});

deviceController.get("/create", (req, res) => {
  res.render("devices/create");
});

deviceController.post("/create", isUser, async (req, res) => {
  const deviceData = req.body;
  const userId = req.user.id;

  try {
    await deviceService.create(deviceData, userId);
    res.redirect("/devices");
  } catch (err) {
    const error = getErrorMessage(err);
    res.render("devices/create", { error, device: deviceData });
  }
});

deviceController.get("/:deviceId/details", async (req, res) => {
  const deviceId = req.params.deviceId;
  const device = await deviceService.getOne(deviceId);
  const user=req.user;
  
  const userType = getUserType(device, user);
  
  res.render("devices/details", { device, userType});
});

deviceController.get("/:deviceId/prefer", async (req, res) => {
const deviceId=req.params['deviceId'];
const userId=req.user.id;
try {
await deviceService.likeDevice(deviceId, userId);
res.redirect(`/devices/${deviceId}/details`);
} catch (err) {
  res.render('404', {error: getErrorMessage(err)})
}
});

deviceController.get('/:deviceId/edit',isUser, isOwner, async (req, res)=>{
 res.render('devices/edit', {device: req.device})
});

deviceController.post('/:deviceId/edit',isUser, async (req, res)=>{
  const deviceData=req.body
  const deviceId = req.params['deviceId'];
  const userId=req.user.id;
  try {
    await deviceService.updateDevice(userId, deviceId, deviceData);
    res.redirect(`/devices/${deviceId}/details`);
  } catch (err) {
    res.render('devices/edit', {device:deviceData, error:getErrorMessage(err)})
  }
});

deviceController.get('/:deviceId/delete', isUser, async (req, res)=>{
  const deviceId=req.params['deviceId'];
  const userId=req.user.id;
  try {
    await deviceService.del(deviceId, userId);

  } catch (err) {
    res.render('404', {error:getErrorMessage(err)})
  }
});

deviceController.get('/profile', isUser, async (req, res)=>{
  const userId=req.user.id;
  try {

  } catch (err) {
    res.render('404', {error:getErrorMessage(err)})
  }
});

export default deviceController;
