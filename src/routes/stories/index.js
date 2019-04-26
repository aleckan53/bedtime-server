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
    const story = Service.serializeData(req.body)
    
    Service.uploadStory(req.app.get('db'), story)
      .then(story => res.status(201).json(...story))
      .catch(next)

  })

module.exports = storiesRouter
