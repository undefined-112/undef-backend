const express = require("express")

const router = express.Router()

router.get("/", (req, res) => {
  res.send("chat working")
})

module.exports = router;