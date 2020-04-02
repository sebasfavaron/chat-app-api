const request = require('supertest')
const app = require('../app')
const dbConnection = require('../connections/db_connection');
require("dotenv").config();

describe('Check Mutant Combine Test', () => {
    beforeAll( async () => {
        return dbConnection.connectDb().then( async () => {
            console.log('DB connected!');
        });
    })

    it('DNA Vertical - Horizontal (Mutant)', async () => {
        const body = {
            "dna": [
                "ATGCGT",
                "AAAAAC",
                "AGGAGT",
                "ATATCT",
                "TCACTC",
                "CTCCTT"
            ]
        };
        const res = await request(app)
            .post('/mutants')
            .send(body)
        expect(res.statusCode).toEqual(200)
        expect(res.body.result).toEqual('OK')
    }),
    it('DNA Vertical - Oblicuo R-L (Mutant)', async () => {
        const body = {
            "dna": [
                "ATGCGA",
				"AGTGAC",
				"AGGAGT",
				"ATATCT",
				"TCTCTC",
				"CTCCTT"
            ]
        };
        const res = await request(app)
            .post('/mutants')
            .send(body)
        expect(res.statusCode).toEqual(200)
        expect(res.body.result).toEqual('OK')
    }),
    it('DNA Vertical - Oblicuo L-R (Mutant)', async () => {
        const body = {
            "dna": [
                "ATGCGA",
				"AGTGAC",
				"AGGTGT",
				"ATATTT",
				"TCTCTC",
				"CTCCTT"
            ]
        };
        const res = await request(app)
            .post('/mutants')
            .send(body)
        expect(res.statusCode).toEqual(200)
        expect(res.body.result).toEqual('OK')
    }),
    it('DNA Horizontal - Oblicuo L-R (Mutant)', async () => {
        const body = {
            "dna": [
                "ATGCGA",
				"AGTGAC",
				"CGGTGT",
				"ATATTT",
				"TCTCTC",
				"CGTTTT"
            ]
        };
        const res = await request(app)
            .post('/mutants')
            .send(body)
        expect(res.statusCode).toEqual(200)
        expect(res.body.result).toEqual('OK')
    }),
    it('DNA Horizontal - Oblicuo R-L (Mutant)', async () => {
        const body = {
            "dna": [
                "ATGCGA",
				"AGTGAC",
				"CGGAGT",
				"ATATTT",
				"TCTCTC",
				"CGTTTT"
            ]
        };
        const res = await request(app)
            .post('/mutants')
            .send(body)
        expect(res.statusCode).toEqual(200)
        expect(res.body.result).toEqual('OK')
    }),
    it('DNA Oblicuos L-R y R-L (Mutant)', async () => {
        const body = {
            "dna": [
                "ATGCGAC",
				"AGTGACT",
				"CGGAGTA",
				"ATATTTA",
				"TCTCTCA",
                "CGTTCTG",
                "CGTTTAA"
            ]
        };
        const res = await request(app)
            .post('/mutants')
            .send(body)
        expect(res.statusCode).toEqual(200)
        expect(res.body.result).toEqual('OK')
    })

    afterAll( async () => {
        return dbConnection.closeConnection();
    })  
})