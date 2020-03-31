const request = require('supertest')
const app = require('../app')

describe('Check Mutant Cross Test', () => {
    it('DNA Vertical - Horizontal (1)(Human)', async () => {
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
        expect(res.statusCode).toEqual(403)
    })
    it('DNA Vertical - Oblicuo R-L (Human)', async () => {
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
        expect(res.statusCode).toEqual(403)
    })
    it('DNA Oblicuos L-R y R-L (Human)', async () => {
        const body = {
            "dna": [
                "ATGCGAC",
				"AGTGACT",
				"CGGCGTA",
				"ATATTTA",
				"TCTCTCA",
                "CGTTCTG",
                "CGTTTAA"
            ]
        };
        const res = await request(app)
            .post('/mutants')
            .send(body)
        expect(res.statusCode).toEqual(403)
    })
    it('DNA Vertical - Horizontal (2)(Human)', async () => {
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
        expect(res.statusCode).toEqual(403)
    })
})