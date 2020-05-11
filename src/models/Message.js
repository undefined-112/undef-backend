import mongoose from 'mongoose'

export const Message = mongoose.model('Message', {
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
})

export default Message
