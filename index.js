import app from './src/App'
import mongoose from 'mongoose'

const port = process.env.PORT || 8080

/* Connect to the database */
const mongoUrl = process.env.MONGO_URL || 'mongodb://127.0.0.1/undefbackend'
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
mongoose.Promise = Promise

/* Start the server */
app.listen(port, () =>
  console.log(
    `Backend running on http://127.0.0.1:${port}, connected to db mongodb://${mongoose.connection.host}:${mongoose.connection.port}/${mongoose.connection.name}`
  )
)
