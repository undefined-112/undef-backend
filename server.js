import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import mongoose from 'mongoose'
import crypto from 'crypto'
import bcrypt from 'bcrypt-nodejs'

const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/undefbackend"
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
mongoose.Promise = Promise

const User = mongoose.model('User', {
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  accessToken: {
    type: String,
    default: () => crypto.randomBytes(128).toString('hex')
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

const Admin = mongoose.model('Admin', {
  adminname: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  accessToken: {
    type: String,
    default: () => crypto.randomBytes(128).toString('hex')
  }
})

// const Chatroom= mongoose.model('Chatroom', {
//   chatname: {
//     type: String,
//     required: true,
//     unique: true
//   },
//   password: {
//     type: String,
//     required: true
//   },
//   accessToken: {
//     type: String,
//     default: () => crypto.randomBytes(128).toString('hex')
//   }
// })

// const Message = mongoose.model('Message', {
//   message: {
//     type: String
//   }
// })


const port = process.env.PORT || 8080
const app = express()

// Add middlewares to enable cors and json body parsing
app.use(cors())
app.use(bodyParser.json())

// Start defining your routes here
app.get('/', (req, res) => {
  try {
    console.log("/")
    res.send('Undefined backend')
  } catch (err) {
    res
      .status(400)
      .json({ messsage: 'error', error: err.errors })
  }
})

// User Signup endpoint
app.post('/createuser', async (req, res) => {
  try {
    const { username, email, password } = req.body
    const newUser = await new User({
      username,
      email,
      password: bcrypt.hashSync(password)
    })
    newUser.save()
    console.log('creating user:', username)
    res.status(201).json(newUser)
  } catch (err) {
    res
      .status(400)
      .json({ messsage: 'Could not create user', error: err.errors })
  }
})

// //create admin
app.post('/createadmin', async (req, res) => {
  try {
    const { adminname, password } = req.body
    const newAdmin = await new Admin({
      adminname,
      password: bcrypt.hashSync(password)
    })
    newAdmin.save()
    console.log('creating admin:', adminname)
    res.status(201).json(newAdmin)
  } catch (err) {
    res
      .status(400)
      .json({ messsage: 'Could not create Admin', error: err.errors })
  }
})

// find all users
app.get('/findusers', async (req, res) => {
  console.log('fetching users')
  try {
    const users = await User.find()
    res.json(users)
  } catch (err) {
    res
      .status(400)
      .json({ messsage: 'Could not find any users', error: err.errors })
  }
})

// Rout for user logging in
app.post('/userlogin', async (req, res) => {
  console.log(req.body)
  const user = await User.findOne({ username: req.body.username })
  if (user && bcrypt.compareSync(req.body.password, user.password)) {
    res.json({
      username: user.username,
      userId: user._id,
      accessToken: user.accessToken,
      message: 'yaye ure in'
    })
  } else {
    res.status(401).json({
      statusCode: 401,
      notFound: true,
      error: 'Login failed, username or password incorrect'
    })
  }
})

// Rout for admin logging in
app.post('/adminlogin', async (req, res) => {
  console.log(req.body)
  const admin = await Admin.findOne({ adminname: req.body.adminname })
  if (admin && bcrypt.compareSync(req.body.password, admin.password)) {
    res.json({
      adminname: admin.adminname,
      adminId: admin._id,
      accessToken: admin.accessToken,
      message: 'yaye ure in'
    })
  } else {
    res.status(401).json({
      statusCode: 401,
      notFound: true,
      error: 'Login failed, admin or password incorrect'
    })
  }
})

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
