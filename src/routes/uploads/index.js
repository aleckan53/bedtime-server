const express = require('express')
const uploadsRouter = express.Router()
const Service = require('./service')

uploadsRouter
  .route('/image')
  .post((req, res) => {
    Service.uploadToAws(req, res, err =>  err
      ? res.status(400).json({message: err.message || 'Something went wrong'})
      : Service.saveToDb(req.app.get('db'), {
          link: req.file.location,
          alt: req.file.originalname,
        })
          .then(image => res.status(201).json(...image)))
  })

module.exports = uploadsRouter