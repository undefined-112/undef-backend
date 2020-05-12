import { Router } from 'express'

import Room from '../models/Room'
import Message from '../models/Message'

import getUserIDFromToken from '../helpers/getUserIdFromAuth'

const router = Router()

router.get('/rooms/:roomId/messages', async (req, res) => {
  try {
    const { roomId } = req.params

    const room = await Room.findById(roomId)
    const contents = await Message.find({ _id: { $in: room.messages } })

    res.status(200).json(contents)
  } catch (error) {
    res.status(404).json({ message: 'No habla' })
  }
})

router.post('/rooms/:roomId/messages', async (req, res) => {
  try {
    const { roomId } = req.params
    const { content } = req.body
    const userId = getUserIDFromToken(req)

    const room = await Room.findById(roomId)

    const userIsPartOfRoom = () => (room.users.indexOf(userId) ? true : false)

    if (!userIsPartOfRoom) throw 'Not your room mate'

    const message = await Message.create({ content })
    await room.messages.addToSet(message._id)
    await room.save()

    res.status(200).json(message)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: error.message })
  }
})

router.put('/rooms/:roomId/messages/:messageId', async (req, res) => {
  try {
    const { messageId } = req.params
    const { content } = req.body

    const message = await Message.findByIdAndUpdate(messageId, {
      content: content,
    })
    await message.save()

    res.status(202).json({ content })
  } catch (error) {
    console.error(errpr)
    res.status(404).json({ message: error })
  }
})

router.delete('/rooms/:roomId/messages/:messageId', async (req, res) => {
  try {
    const { messageId } = req.params
    await Message.findByIdAndDelete(messageId)

    res.status(204).json({ message: 'Deleted message' })
  } catch (error) {
    console.error(error)
    res.status(404).json({ message: 'Could not delete' })
  }
})

export default router
