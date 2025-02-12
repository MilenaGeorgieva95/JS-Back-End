import Device from "../models/Device.js";

function create(deviceData, userId) {
  deviceData.owner = userId;
  return Device.create(deviceData);
}

const getLatest3 = ()=>{
return Device.find({}).sort({createdAt: 'desc', _id: 'desc'}).limit(3)
//?Device.find({}, {}, {sort: {_id:-1}, limit: 3})
}

function getAll(){
return Device.find({})
}

export default {
  create,
  getLatest3,
  getAll
};
