import mongoose from 'mongoose'
import crypto from 'crypto'

export const Room = mongoose.model('Room', {
  secret: {
    type: String,
    unique: true,
    default: () => crypto.randomBytes(8).toString('hex'),
  },
  users: {},
  messages: {},
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

export default Room
