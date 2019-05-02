const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const config = require('config')

module.exports = {
  validateFields(creds, res) {
    for(const [key, value] of Object.entries(creds)) {
      if(!value) {
        return res.status(400).json({
          message: `Missing '${key}' in the request body`
        })
      }
    }
  },
  validateUserExists(knex, user_name) {
    return knex('users')
      .where({user_name})
      .first()
  },
  comparePasswords(password, hash) {
    return bcrypt.compare(password, hash)
  },
  createJwt(subject, payload) {
    return jwt.sign(payload, config.JWT_SECRET, {
      subject,
      algorithm: 'HS256'
    })
  }
}