const express = require('express')
const authRouter = express.Router()

authRouter
  .post('/login', express.json(), (req, res, next) => {
    
  })