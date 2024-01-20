const express = require('express');
const route = express.Router();
const categoryServer = require('../server/category')

route.get('/', categoryServer.GetAllCategory)
route.post('/', categoryServer.addCategory)

module.exports = route;