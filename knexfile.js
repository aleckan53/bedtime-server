const { PORT, DB_URL } = require('./src/config')

module.exports = {

  development: {
    client: 'pg',
    connection: DB_URL,
    seeds: {
      directory: './seeds/stories'
    }
  },
};
