import { Router } from 'express'

import config from 'geocity/modules/config.js'
import { load } from 'geocity/modules/data-loader.js'
import { closestCity } from 'geocity/modules/distance.js'
import { selectRandom } from 'geocity/modules/randtools.js'

const conf = config.api.v1
const data = load(conf.databundle)
const cities = data.cities
const search = data.search

const router = Router()


router.get('/locate', async (req, res) => {
    const lat = req.query.lat
    const lon = req.query.lon

    if (lat == null || lon == null) {
        return res.sendStatus(400)
    }

    const closest = closestCity(cities, lat, lon)

    return res.send(closest)
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
    return res.send( selectRandom(cities) )
})

router.get('/capital', async (req, res) => {
    let code = req.query.code

    if (code == null) {
        return res.sendStatus(400)
    }

    code = code.toUpperCase()

    for (let c of cities) {
        if (c.country.code == code && c.country_capital) {
            return res.send(c)
        }
    }

    return res.sendStatus(404)
})


export default router