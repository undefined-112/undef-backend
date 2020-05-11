import request from 'supertest'
import 'babel-polyfill' /* For some reason needed for async/await testing */
import app from '../../app.js'

/* Need to access the database to test like functionality */
import mongoose from 'mongoose'
import User from '../../models/User.js'
import Room from '../../models/Room.js'

const mongoUrl = process.env.MONGO_URL || 'mongodb://127.0.0.1/undefTest'

let server
let TOKEN = ''
let TOKEN_ALTERNATIVE = ''
let SECRET = ''
const PORT = 3002

// SETUP ALL TEST DATA ETC
beforeAll(async () => {
  // initial setup
  mongoose.connect(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  mongoose.Promise = Promise
  server = app.listen(PORT)

  // setup test user token
  const testUser = await User.create({
    username: 'user1',
    password: 'p455w0rd',
  })

  const alternativeUser = await User.create({
    username: 'alternative',
    password: 'p455w0rd',
  })

  TOKEN = `Bearer ${testUser.accessToken}`
  TOKEN_ALTERNATIVE = `Bearer ${alternativeUser.accessToken}`
})

// CLEAR ALL
afterAll(async (done) => {
  await User.deleteMany({})
  await Room.deleteMany({})
  mongoose.connection.close()
  server.close(done)
})

// START TESTS
describe('Rooms CRUD testing', () => {
  it('Creates a room', async () => {
    await request(server).post('/api/rooms/').set('Authorization', TOKEN).send({}).expect(201)
  })

  it('Gets list of rooms asociated to user', async () => {
    const response = await request(server).get('/api/rooms').set('Authorization', TOKEN)

    expect(response.status).toBe(200)
    expect(response.body.length).toBe(1)

    SECRET = response.body[0].secret
  })

  it('Able to add user to room', async () => {
    // get secret from global
    const response = await request(server)
      .put('/api/rooms')
      .send({ secret: SECRET })
      .set('Authorization', TOKEN_ALTERNATIVE)

    expect(response.body.secret).toBe(SECRET)
  })

  it('Alt user can see new room in get /rooms endpoint', async () => {
    const roomResponse = await request(server).get('/api/rooms').set('Authorization', TOKEN_ALTERNATIVE)

    const addedToRooms = roomResponse.body.filter((room) => room.secret === SECRET)

    expect(addedToRooms.length).toBe(1)
  })

  it('Can delete room by ID', async () => {
    const first = await request(server).get('/api/rooms').set('Authorization', TOKEN_ALTERNATIVE)

    // delete by id
    const response = await request(server)
      .delete(`/api/rooms/${first.body[0]._id}`)
      .set('Authorization', TOKEN_ALTERNATIVE)

    expect(response.status).toBe(204)

    // no more rooms left
    const second = await request(server).get('/api/rooms').set('Authorization', TOKEN_ALTERNATIVE)

    expect(second.body.length).toBe(0)
  })
})
