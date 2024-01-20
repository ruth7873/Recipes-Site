const express = require('express');
const route = express.Router();

const bay = require('./bay');
const user = require('./user');
const recipe = require('./recipe');
const category = require('./category');

route.use('/bay', bay);
route.use('/user', user);
route.use('/recipe', recipe)
route.use('/category', category)

module.exports = route;