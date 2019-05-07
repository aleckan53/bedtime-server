const { PORT, DB_URL } = require('./src/config')

module.exports = {

  development: {
    client: 'pg',
    connection: {
      url: 'postgres://gnaaruuuzgvnzl:40d2435b940ab0b710b4d6f8a90cff3aeb8d614d681c983e60f957455eb241fd@ec2-184-72-237-95.compute-1.amazonaws.com:5432/d8ohssgjcbp3ua',
    },
    ssl: true,
    seeds: {
      directory: './seeds/stories',
      ssl: true,
    }
  },
};
