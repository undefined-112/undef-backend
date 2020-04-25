import { Router } from 'express'
import { User } from '../Models/User'

const router = Router()

router.post('/registration', async (req, res, next) => {
  const { username, password } = req.body
  try {
    const user = await User.create({ username, password })
    const { accessToken } = user

    res.status(201).json(accessToken)
  } catch (error) {
    next(error)
  }
})

module.exports = router
