const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('config')
const Service = require('./service')

module.exports = {
  requireAuth(req,res,next) {
    const authToken = req.get('Authorization') || ''

    let bearerToken 
    
    if(!authToken.toLowerCase().startsWith('bearer ')) {
      return res.status(401).json({message: 'Missing bearer token'})
    } else {
      bearerToken = authToken.slice(7, authToken.length)
    }

    try {
      const payload = jwt.verify(bearerToken, JWT_SECRET, {
        algorithms: ['HS256']
      })

      Service.getUserByUsername(req.app.get('db'), payload.sub)
        .then(user => {
          if(!user) {
            return res.status(401).json({message: 'Unauthorized request'})
          } else {
            res.user = user
            next()
            return 
          }
        })
    } catch {
      return res.status(401).json({message: 'Unauthorized request'})
    }
  }
}