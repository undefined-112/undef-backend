import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import mongoose from 'mongoose'
import auth from './lib/auth'
const routes = require('./Routes')

const mongoUrl = process.env.MONGO_URL || 'mongodb://localhost/undefbackend'
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
mongoose.Promise = Promise

const port = process.env.PORT || 8080
const app = express()

// middleware stuff
app.use(cors())
app.use(bodyParser.json())

app.get('/', (req, res) => {
  try {
    res.send('Undefined backend')
  } catch (err) {
    res.status(400).json({ message: 'error', error: err.errors })
  }
})
/* Unprotected routes below */
app.use('/api', routes.user)

/* Protected routes below */
app.use(auth)
app.use('/api', routes.chats)
app.use('/api', routes.users)

/* */
app.use((req, res) => {
  res.status(404).json({ error: `route ${req.originalUrl} doesn't exist` })
})

/* Error handling */
app.use((err, req, res, next) => {
  const status = err.status || 500
  res.status(status).json({ error: err.message })
})

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
