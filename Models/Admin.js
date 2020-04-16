import mongoose from "mongoose"
import crypto from "crypto"

export const Admin = mongoose.model("Admin", {
  adminname: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  accessToken: {
    type: String,
    default: () => crypto.randomBytes(128).toString("hex"),
  },
})

export default Admin
