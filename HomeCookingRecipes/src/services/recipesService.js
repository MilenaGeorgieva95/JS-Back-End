import Recipe from "../models/Recipe.js";

function create(RecipeData, userId) {
  RecipeData.owner = userId;
  return Recipe.create(RecipeData);
}

const getLatest3 = () => {
  return Recipe.find({}).sort({ createdAt: "desc", _id: "desc" }).limit(3);
  //?Recipe.find({}, {}, {sort: {_id:-1}, limit: 3})
};

function getAll() {
  return Recipe.find({});
}

function getOne(RecipeId) {
  return Recipe.findOne({ _id: RecipeId });
}

async function likeRecipe(recipeId, userId){
const recipe = await Recipe.findById(recipeId);
if(recipe.owner.equals(userId)){
  throw new Error('Cannot prefer own offer!')
}

if(recipe.preferredList?.includes(userId)){
  throw new Error('Recipe already preffered!') 
}

recipe.recommendList.push(userId);
return recipe.save();

// return Recipe.findByIdAndUpdate(
//   { _id: RecipeId },
//   { $push: { preferredList: userId } },
//   { runValidators: true } /for enum
// );
}

const del = async (RecipeId, userId)=>{
//return Recipe.deleteOne({_id:RecipeId, owner: userId});

const recipe = await getOne(RecipeId);
if(!recipe){
  throw new Error('Recipe not recognised!')
}
if(!recipe.owner.equals(userId)){
throw new Error('Only owner can delete Recipe!')
}
return Recipe.findByIdAndDelete(RecipeId)
}

const updateRecipe = async (userId, recipeId, recipeData)=>{
  const recipe = await getOne(recipeId);
  const isOwner=recipe.owner.equals(userId);
  if(!isOwner){
    throw new Error('You are not owner of this offer!')
  }

  return Recipe.findByIdAndUpdate(recipeId, recipeData, { runValidators: true })
}

const getRecipesByOwner = (userId)=>{
return Recipe.find({owner: userId});
}

const getPrefRecipesByUser = (userId)=>{
  // return Recipe.find({}).in('preferredList', userId);
  return Recipe.find({preferredList: userId});
  }

const countLikes = (recipe)=>{
return recipe.recommendList.length;
}

const getAllMatches = (filter={})=>{
    if(filter.search){
        return Recipe.find({title: {$regex: filter.search, $options: 'i'}})
    }
    return Recipe.find({});
}

export default {
  create,
  getLatest3,
  getAll,
  getOne,
  likeRecipe,
  del,
  updateRecipe,
  getRecipesByOwner,
  getPrefRecipesByUser,
  countLikes,
  getAllMatches
};