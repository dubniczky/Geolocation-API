import request from 'supertest'

import app from 'geocity/server.js'

// locate
describe('Endpoint: /locate tests', () =>
{
    it('Accuracy: Given coordinates should return Budapest, Hungary', async () => {
        const res = await request(app).get('/api/v1/locate?lat=	47.49836&lon=19.04044')
        
        expect(res.status).toBe(200)
        expect(res.body.ascii_name).toBe('Budapest')
    })

    it('Consistency: two searches of the same location should return the same city', async () => {
        const res1 = await request(app).get('/api/v1/locate?lat=12.0&lon=-3.002')
        const res2 = await request(app).get('/api/v1/locate?lat=12.0&lon=-3.002')
        
        expect(res1.status).toBe(200)
        expect(res2.status).toBe(200)
        expect(res1.body.ascii_name).toBe(res2.body.ascii_name)
    })
})

// search
describe('Endpoint: /search tests', () =>
{
    it('Accuracy: The term budapest should return Budapest, Hungary', async () => {
        const res = await request(app).get('/api/v1/search?q=budapest')
        
        expect(res.status).toBe(200)
        expect(res.body.ascii_name).toBe('Budapest')
    })

    it('Stability: non-existing city should return 404 status', async () => {
        const res = await request(app).get('/api/v1/search?q=doesnotexist')
        
        expect(res.status).toBe(404)
    })

    it('Validity: invalid query should return 400 status', async () => {
        const res = await request(app).get('/api/v1/search')
        
        expect(res.status).toBe(400)
    })
})

// random
describe('Endpoint: /random tests', () =>
{
    it('Accuracy: a random query should return a valid country', async () => {
        const res = await request(app).get('/api/v1/random')
        
        expect(res.status).toBe(200)
        expect(res.body.ascii_name).toBeDefined()
    })

    it('Consistency: multiple queries should return different results', async () => {
        let last = null
        while (true) {
            let res = await request(app).get('/api/v1/random')
            expect(res.status).toBe(200)
            if (last != res) {
                break
            }

            console.log('Random match.')
            last = res
        }

    }, 1000)
})
