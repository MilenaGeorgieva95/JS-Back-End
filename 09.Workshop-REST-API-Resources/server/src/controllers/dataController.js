import { Router } from "express";

const dataController = Router();

dataController.get('/catalog', (req, res)=>{
    res.json(['Catalog']);
})

export default dataController;