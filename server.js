import express from "express"
import bodyParser from "body-parser"
import cors from "cors"
import mongoose from "mongoose"

const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/undefbackend"
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
mongoose.Promise = Promise

const port = process.env.PORT || 8080
const app = express()
const chatRoute = require('./Routes/chat')
const userRoute = require('./Routes/user')
const adminRoute = require('./Routes/admin')

app.use(cors())
app.use(bodyParser.json())
//middleware for routes:
app.use('/chat', chatRoute)
app.use('/user', userRoute)
app.use('/admin', adminRoute)

// Home
app.get("/", (req, res) => {
  try {
    console.log("/")
    res.send("Undefined backend")
  } catch (err) {
    res.status(400).json({ messsage: "error", error: err.errors })
  }
})

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
