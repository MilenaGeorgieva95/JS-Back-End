import deviceService from "../services/deviceService.js";

export const isOwner = async(req, res, next)=>{
const deviceId=req.params['deviceId'];
  const device = await deviceService.getOne(deviceId);
  const isOwner=device.owner.equals(req.user.id);
  if(!isOwner){
    return res.render('404',{error: 'You are not owner of this offer!'})
  }
  req.device=device;
  next();
}