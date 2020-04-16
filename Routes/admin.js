const express = require("express")
import bcrypt from "bcrypt-nodejs"

const router = express.Router()

import { Admin } from "../Models/Admin"


// //create admin
router.post("/create", async (req, res) => {
  try {
    const { adminname, password } = req.body
    const newAdmin = await new Admin({
      adminname,
      password: bcrypt.hashSync(password),
    })
    newAdmin.save()
    console.log("creating admin:", adminname)
    res.status(201).json(newAdmin)
  } catch (err) {
    res
      .status(400)
      .json({ messsage: "Could not create Admin", error: err.errors })
  }
})

// Rout for admin logging in
router.post("/login", async (req, res) => {
  console.log(req.body)
  const admin = await Admin.findOne({ adminname: req.body.adminname })
  if (admin && bcrypt.compareSync(req.body.password, admin.password)) {
    res.json({
      adminname: admin.adminname,
      adminId: admin._id,
      accessToken: admin.accessToken,
      message: "yaye ure in",
    })
  } else {
    res.status(401).json({
      statusCode: 401,
      notFound: true,
      error: "Login failed, admin or password incorrect",
    })
  }
})

module.exports = router;