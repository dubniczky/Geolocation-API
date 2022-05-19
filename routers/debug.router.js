import { Router } from 'express'

const router = Router()

router.get('/headers', (req, res) => {
    res.json(req.headers)
})

export default router