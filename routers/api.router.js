import { Router } from 'express'

import { router as v1 } from 'geocity/routers/api/v1/router.js'

const router = Router()

router.use('/v1', v1)

export default router