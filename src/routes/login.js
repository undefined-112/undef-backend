import bcrypt from "bcrypt-nodejs"
import { Router } from "express"
import { User } from "../models/User"

const router = Router()

router.post("/login", async (req, res, next) => {
  const { username, password } = req.body
  try {
    const user = await User.findOne({ username: username })

    if (user && bcrypt.compareSync(password, user.password)) {
      res.status(200).json(user.accessToken)
    } else {
      res.status(401).json({
        statusCode: 401,
        notFound: true,
        error: "Login failed, username or password incorrect",
      })
    }
  } catch (error) {
    next(error)
  }
})

export default router
