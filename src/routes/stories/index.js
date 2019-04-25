const express = require('express')
const jsonParser = express.json()
const storiesRouter = express.Router()
const Service = require('./service')

storiesRouter
  .route('/:id')
  .get((req, res, next) => {
    Service.getStoryById(req.app.get('db'), req.params.id)
      .then(story => (!story)
        ? res.status(404).json({message: `Story doesn't exist`})  
        : res.status(200).json(story))
      .catch(next)
  })

storiesRouter
  .route('/')
  .get((req, res, next) => {
    Service.getStoriesList(req.app.get('db'))
      .then(stories => res.status(200).json(stories))
      .catch(next)
  })
  .post(jsonParser, (req, res, next) => {
    // serialize data
    // check required fields
  })

module.exports = storiesRouter
