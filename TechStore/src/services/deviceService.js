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

export default {
  create,
  getLatest3,
  getAll,
  getOne,
  likeDevice
};
