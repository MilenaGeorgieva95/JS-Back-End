import { Router } from "express";
import { isNotLoggedIn } from "../middlewares/auth-middleware.js";
import volcanoesService from "../services/volcanoes-service.js";
import { getErrorMessage } from "../utils/errorUtils.js";
import { getTypes } from "../utils/categoriesUtils.js";

const volcanoesController = Router();

volcanoesController.get('/create', isNotLoggedIn, (req, res)=>{
    const types=getTypes()
    res.render('volcanoes/create', {types});   
})

volcanoesController.post('/create', isNotLoggedIn, async (req, res)=>{
    const volcanoData = req.body;
    const user = req.user;
    
    try {
       await volcanoesService.createVolcano(volcanoData, user)
       res.redirect('/volcanoes/catalog'); 
    } catch (err) {
        const errorMessge=getErrorMessage(err)
        const types=getTypes(volcanoData.typeVolcano);
        res.render('volcanoes/create', {volcano: volcanoData, types, error: errorMessge})
    }
     
})

volcanoesController.get('/catalog', (req, res)=>{
    res.render('volcanoes/catalog');   
})

export default volcanoesController;