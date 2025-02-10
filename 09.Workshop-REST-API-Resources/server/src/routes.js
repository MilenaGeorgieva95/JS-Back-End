import { Router } from "express";
import dataController from "./controllers/dataController.js";
import userController from "./controllers/userController.js";

const routes = Router();

routes.use('/data', dataController);
routes.use('/users', userController);

export default routes;