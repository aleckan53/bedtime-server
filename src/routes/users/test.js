const app = require('app')
const knex = require('knex')
const { seedTables, cleanTables } = require('tests/helpers')
const { stories, users, images } = require('tests/fixtures')

describe('Stories endpoints', () => {
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

  describe('POST /api/users/create', () => {
    it('repsonds with 201 and creates a user with hashed password', () => {
      const newUser = {
        user_name: 'test123',
        password: 'test12345',
      }
      return supertest(app)
        .post('/api/users')
        .send(newUser)
        .expect(201)
        .expect(res => {
          expect(res.body.user_name).to.be.equal(newUser.user_name)
          expect(res.body).to.have.property('id')
          expect(res.body).to.not.have.property('password')
        })
    })

    it('responds with 400 if user_name is taken', () => {
      const newUser = users()[0]

      return supertest(app)
        .post('/api/users')
        .send(newUser)
        .expect(400, {
          message: `Username '${newUser.user_name}' is already taken`
        })
    })
  })
})