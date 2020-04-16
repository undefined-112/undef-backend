import mongoose from "mongoose"
import crypto from "crypto"

export const User = mongoose.model("User", {
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  accessToken: {
    type: String,
    default: () => crypto.randomBytes(128).toString("hex"),
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

export default User
