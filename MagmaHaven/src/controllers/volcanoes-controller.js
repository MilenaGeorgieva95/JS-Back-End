import { Router } from "express";
import { isNotLoggedIn } from "../middlewares/auth-middleware.js";
import volcanoesService from "../services/volcanoes-service.js";
import { getErrorMessage } from "../utils/errorUtils.js";
import { getTypes } from "../utils/categoriesUtils.js";
import { Types } from "mongoose";

const volcanoesController = Router();

volcanoesController.get("/create", isNotLoggedIn, (req, res) => {
  const types = getTypes();
  res.render("volcanoes/create", { types, title: "Create Page" });
});

volcanoesController.post("/create", isNotLoggedIn, async (req, res) => {
  const volcanoData = req.body;
  const user = req.user;

  try {
    await volcanoesService.createVolcano(volcanoData, user);
    res.redirect("/volcanoes");
  } catch (err) {
    const errorMessge = getErrorMessage(err);
    const types = getTypes(volcanoData.typeVolcano);
    res.render("volcanoes/create", {
      volcano: volcanoData,
      types,
      error: errorMessge,
      title: "Create Page",
    });
  }
});

volcanoesController.get("/", async (req, res) => {
  try {
    const volcanoes = await volcanoesService.getAll().lean();
    res.render("volcanoes/catalog", { volcanoes, title: "Catalogue Page" });
  } catch (err) {
    const error = getErrorMessage(err);
    res.redirect("/404", { error });
  }
});

volcanoesController.get("/:volcanoId/details", async (req, res) => {
  const id = req.params.volcanoId;
  try {
    const volcano = await volcanoesService.getOneById(id).lean()
    volcano.votesCount = volcano.voteList.length;
    const isUser = !!req.user;
    const isOwner = volcano.owner.toString() === req.user?._id;
    const isVoted = volcano.voteList.some(userId=>userId==req.user?._id);

    res.render("volcanoes/details", {
      volcano,
      isUser,
      isOwner,
      isVoted,
      title: "Details Page",
    });
  } catch (err) {
    const error = getErrorMessage(err);
    res.redirect("/404", { error });
  }
});

volcanoesController.get("/:volcanoId/vote", isNotLoggedIn, async (req, res) => {
  const volcanoId = req.params.volcanoId;
  const userId = req.user._id;
  try {
    await volcanoesService.vote(volcanoId, userId);
    res.redirect(`/volcanoes/${volcanoId}/details`);
  } catch (err) {
    const error = getErrorMessage(err);
    res.redirect("/404", { error });
  }
});

export default volcanoesController;
