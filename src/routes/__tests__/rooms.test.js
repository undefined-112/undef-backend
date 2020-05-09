import request from 'supertest'
import 'babel-polyfill' /* For some reason needed for async/await testing */
import app from '../../app.js'

/* Need to access the database to test like functionality */
import mongoose from 'mongoose'
import User from '../../models/User.js'
import Room from '../../models/Room.js'
const mongoUrl = 'mongodb://localhost/happyThoughtsTest'

let server
const PORT = 3001

beforeAll(async () => {
  mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  mongoose.Promise = Promise
  await User.deleteMany({})

  server = app.listen(PORT)
})

beforeEach(async () => {
  await User.deleteMany({})
  await Room.deleteMany({})
})

afterAll((done) => {
  mongoose.connection.close()
  server.close(done)
})

describe('rooms routes testing', () => {
  it('creates a room', async () => {
    const user = await User.create({ username: 'user1', password: 'pw' })

    await request(server)
      .post('/api/rooms/')
      .set('Authorization', 'Bearer ' + user.accessToken)
      .send({ user: user._id })
      .expect(201)
  })
  it('adds a user to an existing room via secret', async () => {
    const user1 = await User.create({ username: 'user1', password: 'pw' })
    const user2 = await User.create({ username: 'user2', password: 'pw' })

    /* Add a user to create a room */
    const response1 = await request(server)
      .post('/api/rooms/')
      .set('Authorization', 'Bearer ' + user1.accessToken)
      .send({ user: user1._id })

    /* Add a new user to the room */
    const response2 = await request(server)
      .post('/api/rooms/')
      .set('Authorization', 'Bearer ' + user2.accessToken)
      .send({
        user: user2._id,
        secret: response1.body.secret,
      })
      .expect(200)

    const expected = 2
    const actual = response2.body.users.length
    expect(actual).toEqual(expected)
  })
})
