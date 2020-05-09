import express from 'express'
import { Room } from '../models/Room'

const router = express.Router()

/* Return all rooms */
router.get('/rooms', async (req, res) => {
  try {
    const room = await Room.find()

    res.json(room)
  } catch (error) {
    console.error(error)
  }
})

/* Return room based on room ObjectID (not secret!) */
router.get('/rooms/:id', async (req, res) => {
  console.log(req.params.id)
  try {
    const rooms = await Rooms.find()

    res.json(rooms)
  } catch (error) {
    console.error(error)
  }
})
/* Create new room or add room (if secret is provided) */
router.post('/rooms', async (req, res) => {
  try {
    const { user, secret } = req.body
    if (!user) throw new Error('No user provided')

    if (secret) {
      /* Should add user to existing room */
      const room = await Room.findOne({ secret: secret })

      if (!room) throw new Error(`A room with the secret ${secret} does not exist`)

      room.users.addToSet(user)

      await room.save()

      res.status(200).json(room)
    } else {
      /* Should create new room */
      const room = await Room.create({})

      room.users.addToSet(user)
      await room.save()
      res.status(201).json(room)
    }
  } catch (error) {
    console.error(error)
    res.status(404).json({ message: `Could not add the room: ${error.message}` })
  }
})

module.exports = router
