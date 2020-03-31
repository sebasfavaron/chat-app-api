const request = require('supertest')
const app = require('../app')

describe('Check Mutant Combine Test', () => {
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
    it('DNA Vertical - Oblicuo R-L', async () => {
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
    it('DNA Vertical - Oblicuo L-R', async () => {
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
    it('DNA Horizontal - Oblicuo L-R', async () => {
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
    it('DNA Horizontal - Oblicuo R-L', async () => {
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
    it('DNA Oblicuos L-R y R-L', async () => {
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
})