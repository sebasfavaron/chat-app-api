const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const mutantsRoutes = require('./api/routes/mutants.routes');

// mongoose
//     .connect('mongodb+srv://pizacluster-nlamk.mongodb.net/mutants?retryWrites=true&w=majority', {    
//         useUnifiedTopology: true,
//         useNewUrlParser: true,
//         auth: {
//             authSource: 'admin'
//         },
//         user: 'root',
//         pass: 'root'
//     })
//     .then(() => {
//         console.log('DB Connected!');

//         app.use(morgan('dev'));
//         app.use(bodyParser.urlencoded({ extended: false }));
//         app.use(bodyParser.json());
//         app.use('/', mutantsRoutes);
//     })
//     .catch(err => {
//         console.log('Error mongoose: ', err.message);
//     });


(async () => {
    try {
        await mongoose
            .connect('mongodb+srv://pizacluster-nlamk.mongodb.net/mutants?retryWrites=true&w=majority', {    
                useUnifiedTopology: true,
                useNewUrlParser: true,
                auth: {
                    authSource: 'admin'
                },
                user: 'root',
                pass: 'root'
            });
        console.log('DB Connected!');    
    } catch (error) {
        console.log('Error mongoose: ', error.message);
    }
  })()

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Rutas que deben manejar los request
app.use('/', mutantsRoutes);

module.exports = app;