const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');

const allRoutes = require('./api/routes/all.routes');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, ResponseType");
    next();
});

// Rutas que deben manejar los request
app.use('/', allRoutes);

module.exports = app;