import { Router } from "express";

const deviceController = Router();

deviceController.get('/create', (req, res)=>{
  res.render('devices/create')
});

deviceController.post('/create', (req, res)=>{
    console.log(req.body);
    
    res.end()
});

export default deviceController;