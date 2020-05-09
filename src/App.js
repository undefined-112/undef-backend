import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'

import routes from './routes'
import auth from './helpers/auth'

const app = express()

app.use(cors())
app.use(bodyParser.json())

app.get('/api/', (req, res) => {
  try {
    res.send('Undefined backend')
  } catch (err) {
    res.status(400).json({ message: 'error', error: err.errors })
  }
})
/* Unprotected routes below */
app.use('/api', routes.register)
app.use('/api', routes.login)

/* Protected routes below */
app.use(auth)
app.use('/api', routes.chats)

/* */
app.use((req, res) => {
  res.status(404).json({ error: `route ${req.originalUrl} doesn't exist` })
})

/* Error handling */
app.use((err, req, res, next) => {
  const status = err.status || 500
  res.status(status).json({ error: err.message })
})

export default app
