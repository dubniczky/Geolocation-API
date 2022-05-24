import request from 'supertest'
import { describe, test, expect } from '@jest/globals'

import app from 'geocity/server.js'

// locate
describe('Endpoint: /locate tests', () =>
{
    test('Accuracy: Given coordinates should return Budapest, Hungary', async () => {
        async function coordMatch(name, lat, lon) {
            const res = await request(app).get(`/api/v1/locate?lat=${lat}&lon=${lon}`)        
            expect(res.status).toBe(200)
            expect(res.body.ascii_name).toBe(name)
        }

        await coordMatch('Budapest', '47.49836', '19.04044')
        await coordMatch('Hurghada', '27.2642989', '33.8119766')
    })

    test('Consistency: two searches of the same location should return the same city', async () => {
        const res1 = await request(app).get('/api/v1/locate?lat=12.0&lon=-3.002')
        const res2 = await request(app).get('/api/v1/locate?lat=12.0&lon=-3.002')
        
        expect(res1.status).toBe(200)
        expect(res2.status).toBe(200)
        expect(res1.body.ascii_name).toBe(res2.body.ascii_name)
    })

    test('Accuracy: searches should have the distance correct approx.', async () => {
        async function distMatch(lat, lon, dist) {
            const res = await request(app).get(`/api/v1/locate?lat=${lat}&lon=${lon}`)
            expect(res.status).toBe(200)
            expect(res.body.distance).toBeCloseTo(dist, 1)
        }

        await distMatch('36.4335641', '-9.8101592', 115.48)
        await distMatch('47.49835', '19.04045', 0)
    })
})

// search
describe('Endpoint: /search tests', () =>
{
    test('Accuracy: The term budapest should return Budapest, Hungary', async () => {
        const res = await request(app).get('/api/v1/search?q=budapest')
        
        expect(res.status).toBe(200)
        expect(res.body.ascii_name).toBe('Budapest')
    })

    test('Stability: non-existing city should return 404 status', async () => {
        const res = await request(app).get('/api/v1/search?q=doesnotexist')
        
        expect(res.status).toBe(404)
    })

    test('Validity: invalid query should return 400 status', async () => {
        const res = await request(app).get('/api/v1/search')
        
        expect(res.status).toBe(400)
    })
})

// random
describe('Endpoint: /random tests', () =>
{
    test('Accuracy: a random query should return a valid country', async () => {
        const res = await request(app).get('/api/v1/random')
        
        expect(res.status).toBe(200)
        expect(res.body.ascii_name).toBeDefined()
    })

    test('Consistency: multiple queries should return different results', async () => {
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

// capital
describe('Endpoint: /capital tests', () =>
{
    test('Accuracy: the capital of countries should be correct', async () => {
        async function nameMatch(code, name) {
            const res = await request(app).get('/api/v1/capital?code=' + code)
            expect(res.status).toBe(200)
            expect(res.body.ascii_name).toBe(name)
            return res
        }
        
        await nameMatch('hu', 'Budapest')
        await nameMatch('us', 'Washington')
        await nameMatch('gb', 'London')
    })

    test('Stability: non-existing country should return 404 status', async () => {
        const res = await request(app).get('/api/v1/capital?code=xx')
        
        expect(res.status).toBe(404)
    })

    test('Validity: invalid query should return 400 status', async () => {
        const res = await request(app).get('/api/v1/capital')
        
        expect(res.status).toBe(400)
    })
})