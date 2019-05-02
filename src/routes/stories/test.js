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
  
  describe('GET /api/stories', () => {
    it('responds with 200 and a list of stories', () => {
      return supertest(app)
        .get('/api/stories')
        .expect(200)
        .expect(res => {
          const fields = ['id', 'author', 'name', 'description', 'link']

          fields.forEach(prop => {
              expect(res.body[0]).to.have.property(prop)
            })
          expect(res.body).to.be.an('array')
          expect(res.body[0].id).to.be.an('number')
        })
    })
  })

  describe.skip('GET /api/stories/:id', () => {
    it('responds with 404 if invalid id', () => {
      return supertest(app)
        .get('/api/stories/999')
        .set({'Authorization': `Bearer `})
        .expect(404, {message: `Story doesn't exist`})
    })
  })

  describe('POST /api/stories', () => {
    it('responds with 201 and creates a story', () => {
      const newStory = stories()[0]

      return supertest(app)
        .post('/api/stories')
        .send(newStory)
        .expect(201)
        .expect(res => {
          const fields = ['id', 'author', 'name', 'description', 'content']

          fields.forEach(prop => {
            expect(res.body).to.have.property(prop)
          })
        })
    })
  })

  describe('GET /api/stories/:id', () => {
    it('responds with 401 if unauthorized', () => {
      return supertest(app)
        .get('/api/stories/1')
        .expect(401, {
          message: 'Missing bearer token'
        })
    })
  })
})