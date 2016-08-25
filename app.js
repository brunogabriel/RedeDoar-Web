import debug from 'debug'
import { createServer } from 'http'
import app from './api'

const server = createServer(app)

app.set('host', process.env.HOST || 'localhost')
app.set('port', process.env.PORT || 8000)

server.listen(app.get('port'), app.get('host'), () => {
  console.log('Express listening on port: ' + app.get('port'))
})
