const express = require('express')
const storiesRouter = express.Router()

storiesRouter
  .route('/:story_id')
  .get((req, res, next) => {
    // send a specified story
  })

storiesRouter
  .route('/')
  .get((req, res, next) => {
    // send all stories
  })

