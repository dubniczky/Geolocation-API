import request from 'supertest'

import app from 'geocity/server.js'

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