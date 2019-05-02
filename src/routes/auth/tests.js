const app = require('app')
const knex = require('knex')
const { seedTables, cleanTables } = require('tests/helpers')
const { stories, users, images } = require('tests/fixtures')
const { createJwt } = require('./service')

describe('Auth endpoints', () => {
  let db
  const fields = ['id', 'author', 'name', 'description', 'content']
  before('make knex instance', () => {
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DB_URL
    })

    app.set('db', db)
  })

  beforeEach('seed tables', () => seedTables(db, {
    users: users(), 
    images: images(), 
    stories: stories(),
  }))

  afterEach(() => cleanTables(db))
  after('disconnect from db', ()=> db.destroy())

  describe('POST /api/login', () => {
    it('responds with 400 if missing field', () => {
      return supertest(app)
        .post('/api/login')
        .send({
          user_name: 'test'
        })
        .expect(400, {
          message: `Missing 'password' in the request body`
        })
    })

    it('responds with 400 if user_name is incorrect', () => {
      return supertest(app)
        .post('/api/login')
        .send({
          user_name: 'test',
          password: 'test'
        })
        .expect(400, {
          message: `User 'test' doesn't exist`
        })
    })

    it('responds with 400 if password doesn\'t match', () => {
      return supertest(app)
        .post('/api/login')
        .send({
          user_name: users()[0].user_name,
          password: 'test'
        })
        .expect(400, {
          message: 'Incorrect password'
        })
    })

    it('responds with 200 and JWT when valid creds', () => {
      const user = {
        ...users()[0],
        password: 'password1'
      }
      const expectedToken = createJwt(user.user_name, {
        user_id: 1
      })
      return supertest(app)
        .post('/api/login')
        .send(user)
        .expect(200)
        .then(res => {
          expect(res.body.authToken).to.be.eql(expectedToken)
        })
    })
  })
})