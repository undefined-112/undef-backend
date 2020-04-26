import http from "http"
import https from "https"
import fs from "fs"

import app from "./src/App"

const privateKey = fs.readFileSync("./server.key", "utf8")
const serverCert = fs.readFileSync("./server.cert", "utf8")

const port = process.env.PORT || 8080

const httpServer = http.createServer(app)

const httpsServer = https.createServer(
  {
    key: privateKey,
    cert: serverCert,
  },
  app
)

httpServer.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})

httpsServer.listen(port + 1, () => {
  console.log(`Server running on https://localhost:${port + 1}`)
})
