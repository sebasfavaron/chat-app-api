const request = require('supertest')
const app = require('../app')
const dbConnection = require('../connections/db_connection');

describe('Check Mutant Cross Test', () => {
    beforeAll( async () => {
        return dbConnection.connectDb().then( async () => {
            console.log('DB connected!');
        });
    })

    it('DNA Vertical - Horizontal (1)(Mutant)', async () => {
        const body = {
            "dna": [
                "AAAAGT",
                "AACAAC",
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
    })
    it('DNA Vertical - Oblicuo R-L (Mutant)', async () => {
        const body = {
            "dna": [
                "ATGAGA",
				"AGAGTC",
				"AAGCGT",
				"ATATCT",
				"TCTCTC",
				"CTCCTT"
            ]
        };
        const res = await request(app)
            .post('/mutants')
            .send(body)
        expect(res.statusCode).toEqual(200)
    })
    it('DNA Oblicuos L-R y R-L (Mutant)', async () => {
        const body = {
            "dna": [
                "GTGCGAC",
				"AGTGACT",
				"CCGCGTA",
				"AGAGTTA",
				"TCTCTCA",
                "CGTTCTG",
                "CGTTTAA"
            ]
        };
        const res = await request(app)
            .post('/mutants')
            .send(body)
        expect(res.statusCode).toEqual(200)
    })
    it('DNA Vertical - Horizontal (2)(Mutant)', async () => {
        const body = {
            "dna": [
                "ATAAGT",
                "TACAAC",
                "ACCCCT",
                "ATCTCT",
                "TGCATC",
                "CTTCTT"
            ]
        };
        const res = await request(app)
            .post('/mutants')
            .send(body)
        expect(res.statusCode).toEqual(200)
    })

    it('DNA Vertical + letters (Human)', async () => {
        const body = {
            "dna": [
                "AAGAGT",
                "AACAAC",
                "AGGAGT",
                "ATATCT",
                "ACACTC",
                "CTCCTT"
            ]
        };
        const res = await request(app)
            .post('/mutants')
            .send(body)
        expect(res.statusCode).toEqual(403)
    })

    it('DNA Horizontal + letters (Human)', async () => {
        const body = {
            "dna": [
                "GGGGGT",
                "AACAAC",
                "CGGAGT",
                "ATATCT",
                "ACACTC",
                "CTCCTT"
            ]
        };
        const res = await request(app)
            .post('/mutants')
            .send(body)
        expect(res.statusCode).toEqual(403)
    })

    it('DNA Vertical + letters (Mutant)', async () => {
        const body = {
            "dna": [
                "AAGAGTTT",
                "AACAACCA",
                "AGGAGTAC",
                "ATATCTTA",
                "ACACTCAC",
                "ATCCTTCT",
                "AGGAGTAC",
                "ATCCTTCT",
            ]
        };
        const res = await request(app)
            .post('/mutants')
            .send(body)
        expect(res.statusCode).toEqual(200)
    })

    it('DNA Horizontal + letters (Mutant)', async () => {
        const body = {
            "dna": [
                "AATAATTT",
                "CACAACCA",
                "AGGAGTAC",
                "AAAAAAAA",
                "ACACTCAC",
                "TTCCTTCT",
                "AGGAGTAC",
                "ATCCTTCT",
            ]
        };
        const res = await request(app)
            .post('/mutants')
            .send(body)
        expect(res.statusCode).toEqual(200)
    })

    afterAll( async () => {
        return dbConnection.closeConnection();
    })  
})