const mongoose = require('mongoose');

const connectDb = () => {
    return mongoose
        .connect('mongodb+srv://'+process.env.DB_URL+'/'+process.env.DB_NAME+'?retryWrites=true&w=majority', {    
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

module.exports = { connectDb , closeConnection};