import { Router } from 'express'
import { load, makeSearchList } from 'geocity/modules/data-loader.js'


const cities = load('cities.json')
const search = makeSearchList(cities)
const router = Router()


router.get('/locate', async (req, res) => {
    const lat = req.query.lat
    const lon = req.query.lon

    if (lat == null || lon == null) {
        return res.sendStatus(400)
    }


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