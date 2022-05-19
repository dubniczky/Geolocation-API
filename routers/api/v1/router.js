import { Router } from 'express'
import { load, makeSearchList } from 'geocity/modules/data-loader.js'
import { cityDistance } from 'geocity/modules/coord-distance.js'


const cities = load('cities.json')
const search = makeSearchList(cities)
const router = Router()


router.get('/locate', async (req, res) => {
    const lat = req.query.lat
    const lon = req.query.lon

    if (lat == null || lon == null) {
        return res.sendStatus(400)
    }

    let closestIndex = 0
    let dist = cityDistance(lat, lon, 0, cities)

    for (let i in cities) {
        let d = cityDistance(lat, lon, i, cities)
        if (d < dist) {
            dist = d
            closestIndex = i
        }
    }

    let city = { ... cities[closestIndex] }
    city.distance = dist * 111

    return res.send(city)
})

router.get('/search', async (req, res) => {
    const q = req.query.q

    if (q == null) {
        return res.sendStatus(400)
    }

    for (let i in search) {
        if (search[i] == q) {
            return res.send(cities[i])
        }
    }

    return res.sendStatus(404)
})

router.get('/random', async (req, res) => {
    const index = Math.floor(Math.random() * search.length)
    
    return res.send(cities[index])
})

router.get('/capital', async (req, res) => {
    let code = req.query.code

    if (code == null) {
        return res.sendStatus(400)
    }

    code = code.toUpperCase()

    for (let c of cities) {
        if (c['country_code'] == code && c['feature_code'] == 'PPLC') {
            return res.send(c)
        }
    }

    return res.sendStatus(404)
})


export default router