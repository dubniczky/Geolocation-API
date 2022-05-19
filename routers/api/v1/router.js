import { Router } from 'express'
import load from 'geocity/modules/data-loader.js'


const cities = load('cities.json')
const router = Router()

router.get('/locate', (req, res) => {
    const lat = req.query.lat
    const lon = req.query.lon

    if (lat == null || lon == null) {
        return res.sendStatus(400)
    }

    
})

router.get('/search', (req, res) => {
    const q = req.query.q

    if (q == null) {
        return res.sendStatus(400)
    }

    for (let c of cities) {
        if (c['ascii_name'] == q) {
            return res.send(c)
        }
    }

    return res.sendStatus(404)
})


export default router