const request = require('supertest')
const app = require('../app')
const dbConnection = require('../connections/db_connection');


describe('Check Mutant Simple Test', () => {
    beforeAll( async () => {
        return dbConnection.connectDb().then( async () => {
            console.log('DB connected!');
        });
    })

    it('STATS DNA Mutants', async () => {
        const res = await request(app)
            .get('/stats')
        console.log(res.body)    
        expect(res.statusCode).toEqual(200)
    })

    afterAll( async () => {
        return dbConnection.closeConnection();
    }) 
})