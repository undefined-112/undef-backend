import request from 'supertest'
import 'babel-polyfill' /* For some reason needed for async/await testing */
import app from '../../App.js'

/* Need to access the database to test like functionality */
import mongoose from 'mongoose'

import User from '../../models/User'
import Room from '../../models/Room'
import Message from '../../models/Message'

const mongoUrl = process.env.MONGO_URL || 'mongodb://127.0.0.1/undefTest'

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
  await Room.deleteMany({})
  await Message.deleteMany({})
  server = app.listen(PORT)
})

afterAll((done) => {
  mongoose.connection.close()
  server.close(done)
})

describe('Messages', () => {
  // setup test user token
  it('Able to post a message to room', async () => {
    const testUser = await User.create({
      username: 'messenger1',
      password: 'p455w0rd',
    })

    const TOKEN = `Bearer ${testUser.accessToken}`

    const room = await Room.create({})
    await room.users.addToSet(testUser._id)
    await room.save()

    const response = await request(server)
      .post(`/api/rooms/${room._id}/messages`)
      .send({ content: 'Hello dear message here' })
      .set('Authorization', TOKEN)

    expect(response.status).toBe(200)
    expect(response.body.content).toBe('Hello dear message here')
  })

  it('Able to Update a posted message', async () => {
    // 1. user
    // 2. messages
    // 3. add them to rooms
    // 4. TEST

    // 1. Test users to get tokens
    const testUser = await User.create({
      username: 'messenger2',
      password: 'p455w0rd',
    })

    const TOKEN = `Bearer ${testUser.accessToken}`

    const room = await Room.create({})
    await room.users.addToSet(testUser._id)
    await room.save()

    // 2. create base messages
    const message = await Message.create({ content: 'hello mister' })
    const message2 = await Message.create({ content: 'hello too youu' })

    // 3. add messages to rooms
    await room.messages.addToSet(message._id)
    await room.messages.addToSet(message2._id)
    await room.save()

    // 4. test to update
    const response = await request(server)
      .put(`/api/rooms/${room._id}/messages/${message._id}`)
      .send({ content: 'No longer hello' })
      .set('Authorization', TOKEN)

    // 4.
    const response2 = await request(server)
      .put(`/api/rooms/${room._id}/messages/${message2._id}`)
      .send({ content: 'No longer boo' })
      .set('Authorization', TOKEN)

    expect(response.body.content).toBe('No longer hello')
    expect(response2.body.content).toBe('No longer boo')
  })
})
