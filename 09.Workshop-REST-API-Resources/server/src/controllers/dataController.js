import { Router } from "express";

const dataController = Router();

dataController.get('/catalog', (req, res)=>{
    res.send('Catalog')
})

export default dataController;