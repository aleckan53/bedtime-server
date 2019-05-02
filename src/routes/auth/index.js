const express = require('express')
const authRouter = express.Router()
const Service = require('./service')

authRouter
  .post('/', express.json(), (req, res, next) => {

    const loginUser = {
      user_name: req.body.user_name,
      password: req.body.password
    }
    // Checks missing fields
    for(const [key, value] of Object.entries(loginUser)) {
      if(!value) {
        return res.status(400).json({
          message: `Missing '${key}' in the request body`
        })
      }
    }
    // Checks user_name
    Service.validateUserExists(req.app.get('db'), loginUser.user_name)
      .then(user => {
        if(!user) {
          return res.status(400).json({
            message: `User '${loginUser.user_name}' doesn't exist`
          })
        } 
        // Compares readable and hashed passwords
        Service.comparePasswords(loginUser.password, user.password)
          .then(match => {
            if(!match) {
              return res.status(400).json({
                message: `Incorrect password`
              })
            }
            res.send({
              authToken: Service.createJwt(user.user_name, {
                user_id: user.id
              })
            })
          })
      })
      .catch(next)
  })

module.exports = authRouter