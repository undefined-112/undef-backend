import mongoose from "mongoose"

export const Chat = mongoose.model("Chat", {
  name: {
    type: String,
    required: true,
    unique: true,
    created: new Date(),
  },
})
