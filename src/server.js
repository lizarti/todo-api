const path = require('path')
const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router(path.join(__dirname, 'db.json'))

const middlewares = jsonServer.defaults()

server.use(middlewares)
server.use(jsonServer.bodyParser)
server.use((req, res, next) => {
  if (req.method === 'POST') {
    req.body.created_at = new Date().toLocaleString()
    req.body.updated_at = new Date().toLocaleString()
    req.body.done = false
  }
  if (req.method === 'PUT') {
    req.method = 'PATCH'
  }
  if (req.method === 'PATCH') {
    req.body.updated_at = new Date().toLocaleString()
    req.body.done = !!req.body.done
  }
  next()
})
server.use('/api', router)
server.listen(3000, () => {
  console.log('JSON Server is running')
})
