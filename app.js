const express = require('express');
const app = express();

var rot13Controller = require('./app/controllers/rot13_controller');
app.use('/', rot13Controller);

module.exports = app;
