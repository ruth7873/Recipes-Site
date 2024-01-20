const express = require('express');
const route = express.Router();

const recipe = require('../server/recipe');


route.get('/', recipe.GetAllRecipe);
route.post('/', recipe.addRecipy);
route.post('/edit', recipe.EditRecipy);
route.post('/delete/:Id', recipe.Delete);


module.exports = route;