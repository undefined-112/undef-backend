import bcrypt from "bcrypt-nodejs"
import { Router } from "express"
import { User } from "../models/user"

const router = Router()

router.post("/register", async (req, res, next) => {
  const { username, password } = req.body
  try {
    const user = await User.create({
      username: username,
      password: bcrypt.hashSync(password),
    })
    const { accessToken } = user

    res.status(201).json(accessToken)
  } catch (error) {
    next(error)
  }
})

export default router
