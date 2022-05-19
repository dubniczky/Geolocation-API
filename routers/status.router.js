import { Router } from 'express'

const router = Router()

router.get('/health', (req, res) => {
    res.json({
        status: 'online',
        accepting: true
    })
})

export default router