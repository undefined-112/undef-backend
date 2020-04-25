const express = require('express')
import bcrypt from 'bcrypt-nodejs'

const router = express.Router()

import { User } from '../Models/User'

// find all users
router.get('/findall', async (req, res) => {
  console.log('fetching users')
  try {
    const users = await User.find()
    res.json(users)
  } catch (err) {
    res.status(400).json({ messsage: 'Could not find any users', error: err.errors })
  }
})

// User Signup endpoint
router.post('/signup', async (req, res) => {
  console.log('creating')
  try {
    const { username, email, password } = req.body
    const newUser = await new User({
      username,
      email,
      password: bcrypt.hashSync(password),
    })
    newUser.save()
    console.log('creating user:', username)
    res.status(201).json(newUser)
  } catch (err) {
    res.status(400).json({ message: 'Could not create user', error: err.errors })
  }
})

// Rout for user logging in
router.post('/login', async (req, res) => {
  console.log(req.body)
  const user = await User.findOne({ username: req.body.username })
  if (user && bcrypt.compareSync(req.body.password, user.password)) {
    res.json({
      username: user.username,
      userId: user._id,
      accessToken: user.accessToken,
      message: 'yaye ure in',
    })
  } else {
    res.status(401).json({
      statusCode: 401,
      notFound: true,
      error: 'Login failed, username or password incorrect',
    })
  }
})

module.exports = router
