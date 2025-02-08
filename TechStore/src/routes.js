import { Router } from "express";
import homeController from "./controllers/homeController.js";

const router = new Router();

router.use(homeController)

export default router;