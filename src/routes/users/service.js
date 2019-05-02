const bcrypt = require('bcrypt')

module.exports = {
  insertUser(knex, user) {
    return knex('users')
      .insert(user)
      .returning(['id', 'user_name'])
  },
  hashPassword(password) {
    return bcrypt.hash(password, 1)
  },
  checkUsername(knex, user_name) {
    return knex('users')
      .where({user_name})
      .first()
      .then(user => !!user)
  }
}