const app = require('app')
const knex = require('knex')
const { seedTables, cleanTables } = require('tests/helpers')
const { stories, users, images } = require('tests/fixtures')

describe('Stories endpoints', () => {
  let db

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
  
  describe('GET /api/stories', () => {

    it('responds with 200 and a list of stories', () => {
      return supertest(app)
        .get('/api/stories')
        .expect(200)
        .expect(res => {
          ['id', 'author', 'name', 'date_published', 'cover', 'description', 'content']
            .forEach(prop => {
              expect(res.body[0]).to.have.property(prop)
            })
          expect(res.body).to.be.an('array')
          expect(res.body[0].id).to.be.an('number')
        })
    })
  })

  describe('GET /api/stories/:id', () => {
    it('responds with 404 if invalid id', () => {
      return supertest(app)
        .get('/api/stories/999')
        .expect(404, {message: `Story doesn't exist`})
    })
  })
})