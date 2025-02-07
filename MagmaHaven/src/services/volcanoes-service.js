import Volcano from "../models/Volcano.js";

async function createVolcano(data, user) {
  data.owner = user._id;
  return Volcano.create(data);
}

function getAll() {
  return Volcano.find({});
}

function getOneById(id) {
  return Volcano.findById(id);
}

function vote(volcanoId, userId) {
  return Volcano.findByIdAndUpdate(
    { _id: volcanoId },
    { $push: { voteList: userId } },
    { runValidators: true }
  );
}

function del(volcanoId) {
  return Volcano.findByIdAndDelete(volcanoId);
}

//!{runValidators: true} for .findByIdAndUpdate()
function edit(volcanoId, volcanoData) {
  return Volcano.findByIdAndUpdate(volcanoId, volcanoData, {
    runValidators: true,
  });
}

async function isOwner(volcanoId, userId) {
  const volcano = await Volcano.findById(volcanoId).lean();
  const volcanoOwnerId = volcano.owner;
  return volcanoOwnerId.toString() === userId;
}

async function hasVoted(volcanoId, userId) {
  const volcano = await Volcano.findById(volcanoId).lean();
  const hasVoted = volcano.voteList?.some((vote) => vote.toString() === userId);
  return hasVoted;
}

const volcanoesService = {
  createVolcano,
  getAll,
  getOneById,
  vote,
  del,
  edit,
  isOwner,
  hasVoted,
};

export default volcanoesService;
