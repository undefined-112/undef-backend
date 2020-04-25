import bcrypt from 'bcrypt-nodejs'
import { Router } from 'express'
import { User } from '../Models/User'

const router = Router()

router.post('/registration', async (req, res, next) => {
  const { username, password } = req.body
  try {
    const user = await User.create({ username: username, password: bcrypt.hashSync(password) })
    const { accessToken } = user

    res.status(201).json(accessToken)
  } catch (error) {
    next(error)
  }
})

router.post('/login', async (req, res, next) => {
  const { username, password } = req.body
  console.log('1')
  try {
    const user = await User.findOne({ username: username })
    console.log('2')
    console.log(user)
    if (user && bcrypt.compareSync(password, user.password)) {
      res.status(200).json(user.accessToken)
    } else {
      console.log('3')
      res.status(401).json({
        statusCode: 401,
        notFound: true,
        error: 'Login failed, username or password incorrect',
      })
    }
  } catch (error) {
    next(error)
  }
})

module.exports = router
