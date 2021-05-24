const mongoose = require("mongoose");
const router = require("express").Router();

router.get("/hello", (req, res)=> {
  res.send('you reached our 1st endpoint')
})

module.exports = router;