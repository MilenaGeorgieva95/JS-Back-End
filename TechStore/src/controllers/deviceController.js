import { Router } from "express";
import { isUser } from "../middlewares/authMiddleware.js";
import deviceService from "../services/deviceService.js";
import { getErrorMessage } from "../utils/errorUtils.js";

const deviceController = Router();

deviceController.get('/', async (req, res)=>{
const allDevices= await deviceService.getAll();
  res.render('devices/catalog',{devices:allDevices})
});

deviceController.get('/create', (req, res)=>{
  res.render('devices/create')
});

deviceController.post('/create', isUser, async (req, res)=>{
    const deviceData = req.body;
    const userId=req.user.id
    
    try {
      await deviceService.create(deviceData, userId);
      res.redirect('/devices')
    } catch (err) {
      const error=getErrorMessage(err);
      res.render('devices/create', {error, device:deviceData})
    }
    
});

deviceController.get('/:deviceId/details', async (req, res)=>{
  const deviceId=req.params.deviceId
  const device= await deviceService.getOne(deviceId)
  console.log(device);
  
  res.render('devices/details', {device})
});

deviceController.post('/:deviceId/details', (req, res)=>{
  res.render('devices/create')
});

export default deviceController;