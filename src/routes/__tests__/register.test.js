import request from "supertest"
import "babel-polyfill" /* For some reason needed for async/await testing */
import app from "../../App.js"

/* Need to access the database to test like functionality */
import mongoose from "mongoose"
import User from "../../models/User.js"

const mongoUrl = process.env.MONGO_URL || "mongodb://127.0.0.1/undefTest"

let server
const PORT = 3001

beforeAll(async () => {
  mongoose.connect(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  mongoose.Promise = Promise

  await User.deleteMany({})
  server = app.listen(PORT)
})

afterAll((done) => {
  mongoose.connection.close()
  server.close(done)
})

describe("register testing", () => {
  it("registers a user", async () => {
    const payload = { username: "user", password: "password" }
    await request(server).post("/api/register/").send(payload).expect(201)
  }),
    it("does not register a user missing username or password", async () => {
      const payload1 = { username: "user" }
      const payload2 = { password: "password" }
      await request(server).post("/api/register/").send(payload1).expect(500)
      await request(server).post("/api/register/").send(payload2).expect(500)
    })
})
