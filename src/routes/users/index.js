const express = require(`express`)
const usersRouter = express.Router()
const jsonParser = express.json()
const Service = require('./service')

usersRouter
  .route('/:user_id')
  .get((req, res, next) => {
    // responds with users data
  })
  .patch(jsonParser, (req, res, next) => {
    // update user data
  })
  .delete((req, res, next) => {
    // delete a user
  })

usersRouter
  .route('/')
  .post(jsonParser, async (req, res, next) => {
    const newUser = {
      ...req.body,
      password: await Service.hashPassword(req.body.password)
    }
    Service.insertUser(req.app.get('db'), newUser)
      .then(user => res.status(201).json(...user))
      .catch(next)
  })

module.exports = usersRouter