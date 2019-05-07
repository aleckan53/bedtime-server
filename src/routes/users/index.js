const express = require(`express`)
const usersRouter = express.Router()
const Service = require('./service')

usersRouter
  .route('/')
  .post(express.json(), async (req, res, next) => {

    Service.checkUsername(req.app.get('db'), req.body.user_name)
      .then(async userName => {
        if(userName) {
          return res.status(400).json({message: `Username '${req.body.user_name}' is already taken`})
        } else {
          const newUser = {
            ...req.body,
            password: await Service.hashPassword(req.body.password),
            user_name: req.body.user_name.toLowerCase()
          }
          Service.insertUser(req.app.get('db'), newUser)
            .then(user => res.status(201).json(...user))
            .catch(next)
        }
      })
  })

module.exports = usersRouter