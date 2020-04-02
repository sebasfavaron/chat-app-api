const request = require('supertest')
const app = require('../app')
const dbConnection = require('../connections/db_connection');
require("dotenv").config();


describe('Check Mutant Simple Test', () => {
    beforeAll( async () => {
        return dbConnection.connectDb().then( async () => {
            console.log('DB connected!');
        });
    })

    it('DNA Horizontal (Mutant)', async () => {
        const body = {
            "dna": [
                "ATGCGA",
                "CAGTGC",
                "AGAAAA",
                "TTAGGT",
                "TCACTG",
                "CCCCTA"
            ]
        };
        const res = await request(app)
            .post('/mutants')
            .send(body)
        expect(res.statusCode).toEqual(200)
        expect(res.body.result).toEqual('OK')
    })

    it('DNA Horizontal Extended (Human)', async () => {
        const body = {
            "dna": [
                "ATGCGA",
                "CAGTGC",
                "AAAAAA",
                "TTAGGT",
                "TCACTG",
                "CCGCTA"
            ]
        };
        const res = await request(app)
            .post('/mutants')
            .send(body)
        expect(res.statusCode).toEqual(403)
    })

    it('DNA Vertical (Mutant)', async () => {
        const body = {
            "dna": [
                "ATGCGA",
                "AAGTGC",
                "AGGAGT",
                "ATATCT",
                "TCACTT",
                "CTCCTT"
            ]
        };
        const res = await request(app)
            .post('/mutants')
            .send(body)
        expect(res.statusCode).toEqual(200)
        expect(res.body.result).toEqual('OK')
    })

    it('DNA Vertical Extended (Human)', async () => {
        const body = {
            "dna": [
                "ATGCGA",
                "AAGTGT",
                "TGGAGT",
                "ATATCT",
                "TCACTT",
                "CTCCTT"
            ]
        };
        const res = await request(app)
            .post('/mutants')
            .send(body)
        expect(res.statusCode).toEqual(403)
    })

    it('DNA Oblicuo L-R (Mutant)', async () => {
        const body = {
            "dna": [
                "ATGCGA",
                "CAGTTC",
                "TGAAGG",
                "TTAAGT",
                "TCTCTG",
                "CCCTTA"
            ]
        };
        const res = await request(app)
            .post('/mutants')
            .send(body)
        expect(res.statusCode).toEqual(200)
        expect(res.body.result).toEqual('OK')
    })

    
    it('DNA Oblicuo L-R Extended (Human)', async () => {
        const body = {
            "dna": [
                "ATGCGA",
                "CAGTTC",
                "TGAAGG",
                "TGAAGT",
                "TCTCAG",
                "CCCTTA"
            ]
        };
        const res = await request(app)
            .post('/mutants')
            .send(body)
        expect(res.statusCode).toEqual(403)
    })

    it('DNA Oblicuo R-L (Mutant)', async () => {
        const body = {
            "dna": [
                "ATGCGA",
                "CAGTAC",
                "AGGAAG",
                "TTATGT",
                "TCAGTG",
                "CCGCTA"
            ]
        };
        const res = await request(app)
            .post('/mutants')
            .send(body)
        expect(res.statusCode).toEqual(200)
        expect(res.body.result).toEqual('OK')
    })

    it('DNA Oblicuo R-L Extended (Human)', async () => {
        const body = {
            "dna": [
                "ATGCGA",
                "CAGTAC",
                "AGGAAG",
                "TTATGT",
                "TAATTG",
                "ACGCTA"
            ]
        };
        const res = await request(app)
            .post('/mutants')
            .send(body)
        expect(res.statusCode).toEqual(403)
    })

    it('DNA Bad Request (empty body)', async () => {
        const body = { };
        const res = await request(app)
            .post('/mutants')
            .send(body)
        expect(res.statusCode).toEqual(400)
    })

    it('DNA Bad Request (1)(Not NxN)', async () => {
        const body = {
            "dna": [
                "ATGCGA",
                "CAGTAC",
                "AGGAAG",
                "TTATGT",
                "TCAGTG"
            ]
        };
        const res = await request(app)
            .post('/mutants')
            .send(body)
        expect(res.statusCode).toEqual(403)
    })

    it('DNA Bad Request (2)(Not NxN)', async () => {
        const body = {
            "dna": [
                "ATGCGA",
                "CAGTA",
                "AGGAAG",
                "TTATGT",
                "TCAGTG",
                "CCGCTA"
            ]
        };
        const res = await request(app)
            .post('/mutants')
            .send(body)
        expect(res.statusCode).toEqual(403)
    })

    it('DNA Bad Request (3)(Not NxN)', async () => {
        const body = {
            "dna": [
                "ATGCGA",
                "CAGTAC",
                "AGGAAG",
                "TTATGTA",
                "TCAGTG",
                "CCGCTA"
            ]
        };
        const res = await request(app)
            .post('/mutants')
            .send(body)
        expect(res.statusCode).toEqual(403)
    })

    it('DNA Bad Request (Letter False)', async () => {
        const body = {
            "dna": [
                "ATGCGA",
                "CAGTAC",
                "AGGAAG",
                "TTATGT",
                "TCAGTG",
                "CCGCTK"
            ]
        };
        const res = await request(app)
            .post('/mutants')
            .send(body)
        expect(res.statusCode).toEqual(403)
    })

    afterAll( async () => {
        return dbConnection.closeConnection();
    }) 
})