import { Router } from "express";
import homeRouter from "./controllers/home-controller.js";

const router = Router();

router.use(homeRouter);

export default router;
