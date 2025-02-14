import Device from "../models/Device.js";

function create(deviceData, userId) {
  deviceData.owner = userId;
  return Device.create(deviceData);
}

const getLatest3 = () => {
  return Device.find({}).sort({ createdAt: "desc", _id: "desc" }).limit(3);
  //?Device.find({}, {}, {sort: {_id:-1}, limit: 3})
};

function getAll() {
  return Device.find({});
}

function getOne(deviceId) {
  return Device.findOne({ _id: deviceId });
}

async function likeDevice(deviceId, userId){
const device = await Device.findById(deviceId);
if(device.owner.equals(userId)){
  throw new Error('Cannot prefer own offer!')
}

if(device.preferredList?.includes(userId)){
  throw new Error('Device already preffered!') 
}

device.preferredList.push(userId);
return device.save();

// return Device.findByIdAndUpdate(
//   { _id: deviceId },
//   { $push: { preferredList: userId } },
//   { runValidators: true } /for enum
// );
}

const del = async (deviceId, userId)=>{
//return Device.deleteOne({_id:deviceId, owner: userId});

const device = await getOne(deviceId);
if(!device){
  throw new Error('Device not recognised!')
}
if(!device.owner.equals(userId)){
throw new Error('Only owner can delete device!')
}
return Device.findByIdAndDelete(deviceId)
}

const updateDevice = async (userId, deviceId, deviceData)=>{
  const device = await getOne(deviceId);
  const isOwner=device.owner.equals(userId);
  if(!isOwner){
    return res.render('404',{error: 'You are not owner of this offer!'})
  }

  return Device.findByIdAndUpdate(deviceId, deviceData, { runValidators: true })
}

const getDevicesByOwner = (userId)=>{
return Device.find({owner: userId});
}

const getPrefDevicesByUser = (userId)=>{
  // return Device.find({}).in('preferredList', userId);
  return Device.find({preferredList: userId});
  }

export default {
  create,
  getLatest3,
  getAll,
  getOne,
  likeDevice,
  del,
  updateDevice,
  getDevicesByOwner,
  getPrefDevicesByUser
};
