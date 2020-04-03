const request = require('supertest')
const app = require('../app')
require("dotenv").config();


describe('Check Mutant Hello World', () => {

    it('Hello World Test', async (done) => {
        const res = await request(app)
            .get('/') 
        expect(res.statusCode).toEqual(200)
        done()
    })
})