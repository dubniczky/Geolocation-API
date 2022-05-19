import request from 'supertest'

import app from 'geocity/server.js'

describe('Endpoint: /locate tests', () =>
{
    it('Given coordinates should return Vac, Hungary', async () => {
        const res = await request(app).get('/api/v1/locate?lat=47.7832611&lon=19.143853')
        
        expect(res.status).toBe(200)
        expect(res.body.ascii_name).toBe('Vac')
    })
})