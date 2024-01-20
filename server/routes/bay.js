const express = require('express');
const route = express.Router();
const bayServer = require('../server/bay')

route.post('/', bayServer.AddToList)
route.get('/:UserId', bayServer.GetMaList)
route.post('/delete/:Id', bayServer.Delete)

module.exports = route;