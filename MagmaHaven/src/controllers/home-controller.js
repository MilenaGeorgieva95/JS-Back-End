import { Router } from "express";

const homeRouter = Router();

homeRouter.get('/', (req, res)=>{
res.send('It works')
})

export default homeRouter;