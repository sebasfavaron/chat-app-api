const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
// // const mongoose = require('mongoose');

const mutantsRoutes = require('./api/routes/mutants.routes');

// const config = require('./config');

// const docker_ip = '192.168.56.1';
// mongoose
//     .connect('mongodb://' + docker_ip + ':27017/test-node-docker', {
//         useUnifiedTopology: true,
//         useNewUrlParser: true,
//         auth: {
//             authSource: 'admin'
//         },
//         user: config.DBUser,
//         pass: config.DBPass
//     })
//     .then(() => console.log('DB Connected!'))
//     .catch(err => {
//         console.log('Error mongoose: ', err.message);
//     });

// app.get('/', function (req, res) {
//     res.send('Hello Mutants!');
// });


app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Rutas que deben manejar los request
app.use('/', mutantsRoutes);
// app.use('/orders', orderRoutes);
// app.use('/auth', authRoutes);
// app.use('/firebase', firebaseRoutes);
// app.use('/rethinkdb', rethinkDBRoutes);

// app.use((req, res, next) => {
//     const error = new Error('Not Found');
//     error.status = 404;
//     next(error);
// });

// app.use((error, req, res, next) => {
//     res.status(error.status || 500);
//     res.json({
//         error: {
//             message: error.message
//         }
//     });
// });

// exports.getConnectionRDB = function () {
//     return connectionRDB;
// };

// exports.getDockerIp = function () {
//     return docker_ip;
// };

// exports.getIo = function () {
//     return io;
// };

module.exports = app;