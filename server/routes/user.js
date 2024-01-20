const express = require('express');
const route = express.Router();
const user = require('../server/user');

route.post('/login', user.login)
route.post('/sighin', user.sighin)


module.exports = route;