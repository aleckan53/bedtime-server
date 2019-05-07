const express = require('express')
const jsonParser = express.json()
const storiesRouter = express.Router()
const Service = require('./service')
const { requireAuth } = require('./middlewares')

storiesRouter
  .route('/:id')
  .all(requireAuth)
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
  .all(requireAuth)
  .post(jsonParser, (req, res, next) => {
    const content = Service.serializeData(req.body)
    const story = {
      content,
      name: 'New Story',
      description: 'This is a new story',
      author: res.user.user_name,
      cover: 1,
    }
    Service.uploadStory(req.app.get('db'), story)
      .then(() => res.status(201).json({
        message: `Success! Your story has been uploaded. It will be reviewed within 2-5 days. Check back then.`
      }))
      .catch(next)

  })

module.exports = storiesRouter
