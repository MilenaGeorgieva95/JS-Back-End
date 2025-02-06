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
       res.redirect('/volcanoes'); 
    } catch (err) {
        const errorMessge=getErrorMessage(err)
        const types=getTypes(volcanoData.typeVolcano);
        res.render('volcanoes/create', {volcano: volcanoData, types, error: errorMessge})
    }
     
})

volcanoesController.get('/', async (req, res)=>{
const volcanoes = await volcanoesService.getAll().lean()
console.log(volcanoes);

    res.render('volcanoes/catalog', {volcanoes});   
})

export default volcanoesController;