import { Router } from "express";
import recipesService from "../services/recipesService.js";
import { isUser } from "../middlewares/authMiddleware.js";
import { getErrorMessage } from "../utils/errorUtils.js";
import getUserType from "../utils/userTypes.js";

const recipesController = Router();

recipesController.get("/", async (req, res) => {
  const recipes = await recipesService.getAll();
  res.render("recipes/catalog", { recipes });
});

recipesController.get("/create", isUser, async (req, res) => {
  res.render("recipes/create");
});

recipesController.post("/create", isUser, async (req, res) => {
  const recipeData = req.body;
  const userId = req.user.id;
  try {
    const recipes = await recipesService.create(recipeData, userId);
    res.redirect("/recipes");
  } catch (err) {
    const error = getErrorMessage(err);
    res.render("recipes/create", { recipe: recipeData, error });
  }
});

recipesController.get("/:recipeId/details", async (req, res) => {
  const recipeId = req.params.recipeId;
  const recipe = await recipesService.getOne(recipeId);
  const types = getUserType(recipe, req.user);
  const likes = recipesService.countLikes(recipe);
  res.render("recipes/details", {
    recipe,
    types,
    likes,
    pageTitle: recipe.title,
  });
});

recipesController.get("/:recipeId/edit", isUser, async (req, res) => {
  const recipeId = req.params.recipeId;
  const userId = req.user.id;
  const recipe = await recipesService.getOne(recipeId);

  if (!recipe.owner.equals(userId)) {
    return res.redirect("/recipes");
  }
  res.render("recipes/edit", { recipe });
});

recipesController.post("/:recipeId/edit", isUser, async (req, res) => {
  const recipeId = req.params.recipeId;
  const recipeData = req.body;
  try {
    await recipesService.updateRecipe(req.user.id, recipeId, recipeData);
    res.redirect(`/recipes/${recipeId}/details`);
  } catch (err) {
    const error = getErrorMessage(err);
    res.render("recipes/edit", { recipe: recipeData, error });
  }
});

recipesController.get("/:recipeId/delete", isUser, async (req, res) => {
  const recipeId = req.params.recipeId;
  try {
    await recipesService.del(recipeId, req.user.id);
    res.redirect("/recipes");
  } catch (err) {
    res.setError(getErrorMessage(err));
    res.redirect(`/recipes/${recipeId}/details`);
  }
});

recipesController.get("/:recipeId/recommend", isUser, async (req, res) => {
  const recipeId = req.params.recipeId;
  try {
    await recipesService.likeRecipe(recipeId, req.user.id);
    res.redirect(`/recipes/${recipeId}/details`);
  } catch (err) {
    res.setError(getErrorMessage(err));
    res.redirect(`/recipes/${recipeId}/details`);
  }
});

recipesController.get('/search', async (req, res)=>{
    const param=req.query

    const recipes = await recipesService.getAllMatches(param);
    res.render('recipes/search', {recipes, searchData: param.search})
});

export default recipesController;
