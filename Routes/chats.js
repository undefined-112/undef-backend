import express from "express"
import { Chat } from "../Models/Chat"

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

// api/chats
router.post("/chats", async (req, res) => {
  try {
    if (req.body) {
      const { name } = req.body
      // https://mongoosejs.com/docs/models.html
      const chat = await Chat.create({ name })
      res.json(chat, 201)
    } else {
      throw new Error("No body wtfpr")
    }
  } catch (error) {
    console.error(error)
    res.status(404)
  }
})

module.exports = router
