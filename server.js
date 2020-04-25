import express from "express"
import bodyParser from "body-parser"
import cors from "cors"
import mongoose from "mongoose"

const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/undefbackend"
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
mongoose.Promise = Promise

const port = process.env.PORT || 8080
const app = express()

const routes = require("./Routes")

app.use(cors())

//middleware for routes:
app.use(bodyParser.json())
app.use("/api", routes.chats)
app.use("/api", routes.users)

app.get("/", (req, res) => {
  try {
    res.send("Undefined backend")
  } catch (err) {
    res.status(400).json({ messsage: "error", error: err.errors })
  }
})

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
