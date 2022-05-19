import app from 'sigma/server.js'
import config from 'sigma/config.js'

// Start server
app.listen(config.port, () => {
    console.log('Server listening on port:', config.port)
})