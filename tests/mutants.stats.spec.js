const request = require('supertest')
const app = require('../app')
const dbConnection = require('../connections/db_connection');
require("dotenv").config();


describe('Check Mutant Simple Test', () => {
    beforeAll( async () => {
        return dbConnection.connectDb(process.env.DB_NAME_TEST).then( async () => {
            console.log('DB connected!');
        });
    })

    it('STATS DNA Mutants', async (done) => {
        const res = await request(app)
            .get('/stats')
        console.log(res.body)    
        expect(res.statusCode).toEqual(200)
        done()
    })

    afterAll( async () => {
        return dbConnection.closeConnection();
    }) 
})