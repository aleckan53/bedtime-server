const bcrypt = require('bcrypt')

module.exports = {
  insertUser(knex, user) {
    return knex('users')
      .insert(user)
      .returning(['id', 'user_name'])
  },
  hashPassword(password) {
    return bcrypt.hash(password, 1)
  }
}