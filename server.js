import express from 'express'

import config from 'sigma/modules/config.js'

import debugRouter from 'sigma/routers/debug.router.js'
import statusRouter from 'sigma/routers/status.router.js'


// Create server app
const app = express()

// Add routers
if (config.debug) {
    app.use('/debug', debugRouter)
}
app.use('/status', statusRouter)


export default app