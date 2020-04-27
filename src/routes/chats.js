import express from "express"
import { Chat } from "../models/Chat"

const router = express.Router()

// api/chats
router.get("/chats", async (req, res) => {
  try {
    const chats = await Chat.find()

    res.json(chats)
  } catch (error) {
    console.error(error)
  }
})

router.get("/chats/:id", async (req, res) => {
  console.log(req.params.id)
  try {
    const chats = await Chat.find()

    res.json(chats)
  } catch (error) {
    console.error(error)
  }
})
// api/chats
router.post("/chats", async (req, res) => {
  try {
    if (req.body) {
      const { name } = req.body
      // https://mongoosejs.com/docs/models.html
      const chat = await Chat.create({ name })
      res.status(201).json(chat)
    } else {
      throw new Error("No body wtfpr")
    }
  } catch (error) {
    console.error(error)
    res.status(404).json({ message: "Could not add the chat" })
  }
})

module.exports = router
