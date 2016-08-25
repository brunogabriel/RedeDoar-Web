import express from 'express'
let app = express()

app.get('/', (req, res) => {
  res.send('hello world')
})

app.use((err, req, res, next) => {
  res.status(err.status || 500)
  res.json({
    result: 'error',
    message: err.message,
    code: err.code
  })
})

export default app
