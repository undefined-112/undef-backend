import mongoose from "mongoose";
import crypto from "crypto";

export const Room = mongoose.model("Room", {
  secret: {
    type: String,
    unique: true,
    default: () => crypto.randomBytes(4).toString("hex"),
  },
  users: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      unique: true,
    },
  ],
  // messages: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'Message',
  // },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default Room;
