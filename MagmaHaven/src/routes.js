import { Router } from "express";
import homeRouter from "./controllers/home-controller.js";
import authController from "./controllers/auth-controller.js";

const router = Router();

router.use(homeRouter);
router.use('/auth', authController)

export default router;
