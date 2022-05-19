import app from 'geocity/server.js'
import config from 'geocity/modules/config.js'

// Start server
app.listen(config.port, () => {
    console.log('Server listening on port:', config.port)
})