const http = require('http');
const app = require('./app');
const dbConnection = require('./connections/db_connection');
const dotenv = require('dotenv');
dotenv.config();

const port = process.env.NODE_ENV == 'dev' ? 3000 : 8080

const server = http.createServer(app);

dbConnection.connectDb().then( async () => {
    console.log('DB connected!');
    server.listen(port);
});
