import express from 'express'
import { Room } from '../models/Room'
import getUserIDFromToken from '../helpers/getUserIdFromAuth'

const router = express.Router()

/* Return rooms that the user is participant in */
router.get('/rooms', async (req, res) => {
  try {
    const userId = await getUserIDFromToken(req)
    const rooms = await Room.find({ users: userId })
    const modded = rooms.map((room) => {
      return {
        _id: room._id,
        secret: room.secret,
        createdAt: room.createdAt,
      }
    })

    res.status(200).json(modded)
  } catch (error) {
    console.error(error)
  }
})
/* Create a new room with creating user as the first participant */
router.post('/rooms', async (req, res) => {
  try {
    const userId = await getUserIDFromToken(req)
    const room = await Room.create({})
    room.users.addToSet(userId)
    await room.save()

    res.status(201).json({ _id: room._id, secret: room.secret, createdAt: room.createdAt })
  } catch (error) {
    console.error(error)
    res.status(404).json({ message: `Could not add the room: ${error.message}` })
  }
})

/* Get room details based on room ObjectID */
router.get('/rooms/:id', async (req, res) => {
  const { id } = req.params
  try {
    const fullRoom = await Room.findById(id)
    const { secret, _id, createdAt } = fullRoom

    res.status(200).json({
      roomId: _id,
      secret,
      createdAt,
    })
  } catch (error) {
    console.error(error)
    res.status(404).json({ message: `Could not find the room` })
  }
})

/* Add user as participant in a room based on secret */
router.put('/rooms', async (req, res) => {
  try {
    const { secret } = req.body
    const userId = await getUserIDFromToken(req)

    if (!secret) {
      res.status(404).json({ message: 'No secret provided' })
      throw 'No secret provided'
    }

    const room = await Room.findOne({ secret: secret })
    room.users.addToSet(userId)
    await room.save()

    res.status(200).json({
      secret: room.secret,
      roomId: room._id,
      createdAt: room.createdAt,
    })
  } catch (error) {
    console.error(error)
    res.status(404).json({ message: 'Noone added nowhere' })
  }
})

/* Delete room based on room ObjectID (not secret!) */
router.delete('/rooms/:id', async (req, res) => {
  try {
    const { id } = req.params
    await Room.findByIdAndDelete(id)

    res.status(204).json({ message: 'Deleted room' })
  } catch (error) {
    console.error(error)
    res.status(404).json({ message: 'Could not delete' })
  }
})

module.exports = router
