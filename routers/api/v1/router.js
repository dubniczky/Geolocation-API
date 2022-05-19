import { Router } from 'express'
import { load, makeSearchList } from 'geocity/modules/data-loader.js'


const cities = load('cities.json')
const search = makeSearchList(cities)
const router = Router()

function coordDistance(a_lat, a_lon, b_lat, b_lon) {
    const lat = a_lat - b_lat
    const lon = a_lon - b_lon
    return Math.sqrt( lat*lat + lon*lon )
}

function cityDistance(lat, lon, cityIndex) {
    return coordDistance(
        lat,
        lon,
        cities[cityIndex]['coordinates'][0],
        cities[cityIndex]['coordinates'][1])
}


router.get('/locate', async (req, res) => {
    const lat = req.query.lat
    const lon = req.query.lon

    if (lat == null || lon == null) {
        return res.sendStatus(400)
    }

    let closestIndex = 0
    let dist = cityDistance(lat, lon, 0)

    for (let i in cities) {
        let d = cityDistance(lat, lon, i)
        if (d < dist) {
            dist = d
            closestIndex = i
        }
    }

    return res.send(cities[closestIndex])
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


export default router