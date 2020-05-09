import request from 'supertest'
import 'babel-polyfill' /* For some reason needed for async/await testing */
import app from '../App.js'

const PORT = 3001
let server

beforeAll(() => {
  server = app.listen(PORT)
})

afterAll((done) => {
  server.close(done)
})

describe('server testing', () => {
  it('sends a successful reply', async () => {
    await request(server).get('/api/').expect(200)
  })
})
