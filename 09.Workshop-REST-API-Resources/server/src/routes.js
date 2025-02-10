import { Router } from "express";
import dataController from "./controllers/dataController.js";

const routes = Router();

routes.use('/data', dataController);

export default routes;