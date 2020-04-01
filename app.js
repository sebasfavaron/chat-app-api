const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');

const mutantsRoutes = require('./api/routes/mutants.routes');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Rutas que deben manejar los request
app.use('/', mutantsRoutes);

module.exports = app;