import express from 'express'
import { Room } from '../models/Room'

const router = express.Router()

// api/chats
router.get('/rooms', async (req, res) => {
  try {
    const room = await Room.find()

    res.json(room)
  } catch (error) {
    console.error(error)
  }
})

router.get('/rooms/:id', async (req, res) => {
  console.log(req.params.id)
  try {
    const rooms = await Rooms.find()

    res.json(rooms)
  } catch (error) {
    console.error(error)
  }
})
// api/chats
// router.post('/rooms', async (req, res) => {
//   try {
//     //
//     if (req.body) {
//       const { user } = req.body
//       const room = await Room.create()
//       // TODO ADD USER
//       res.status(201).json(room)
//     } else {
//       throw new Error('No body wtfpr')
//     }
//   } catch (error) {
//     console.error(error)
//     res.status(404).json({ message: 'Could not add the chat' })
//   }
// })

module.exports = router
