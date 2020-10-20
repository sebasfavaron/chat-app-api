const mongoose = require('mongoose');

const connectDb = (db_name) => {
    const dbToConnect = db_name != undefined ? db_name : (process.env.NODE_ENV == 'dev') ? process.env.DB_NAME_DEV : process.env.DB_NAME_PROD;
    return mongoose
        .connect('mongodb+srv://' + process.env.DB_URL + '/' + dbToConnect + '?retryWrites=true&w=majority', {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            auth: {
                authSource: 'admin'
            },
            user: process.env.DB_USER,
            pass: process.env.DB_PASS
        });
}

const closeConnection = () => {
    return mongoose.connection.close();
}

module.exports = { connectDb, closeConnection };