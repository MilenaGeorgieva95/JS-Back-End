import { Router } from "express";
import homeController from "./controllers/homeController.js";
import authController from "./controllers/authController.js";
import deviceController from "./controllers/deviceController.js";

const router = Router();

router.use(homeController);
router.use('/auth', authController);
router.use('/devices', deviceController);

export default router;