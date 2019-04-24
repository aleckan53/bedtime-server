const express = require(`express`)
const usersRouter = express.Router()
const jsonParser = express.json()

usersRouter
  .route('/:user_id')
  .get((req, res, next) => {
    // responds with users data
  })
  .patch(jsonParser, (req, res, next) => {
    // update user data
  })
  .post(jsonParser, (req, res, next) => {
    // create a bookmark or add to favorites
  })
  .delete((req, res, next) => {
    // delete a user
  })

usersRouter
  .route('/')
  .post(jsonParser, (req, res, next) => {
    // create a user
  })

module.exports = usersRouter