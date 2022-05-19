import express from 'express'

import config from 'geocity/modules/config.js'

import debugRouter from 'geocity/routers/debug.router.js'
import statusRouter from 'geocity/routers/status.router.js'
import apiV1Router from 'geocity/routers/api/v1/router.js'


// Create server app
const app = express()

// Add routers
if (config.debug) {
    app.use('/debug', debugRouter)
}
app.use('/status', statusRouter)
app.use('/api/v1', apiV1Router)


export default app