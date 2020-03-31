const request = require('supertest')
const app = require('../app')

describe('Check Mutant Simple Test', () => {
    it('DNA Horizontal', async () => {
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
    }),

        it('DNA Vertical', async () => {
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
        }),

        it('DNA Oblicuo L-R', async () => {
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
        }),

        it('DNA Oblicuo R-L', async () => {
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
})