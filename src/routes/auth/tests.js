// const app = require('app')
// const knex = require('knex')
// const { seedTables, cleanTables } = require('tests/helpers')
// const { stories, users, images } = require('tests/fixtures')

// describe('Auth endpoints', () => {
//   let db
//   const fields = ['id', 'author', 'name', 'description', 'content']
//   before('make knex instance', () => {
//     db = knex({
//       client: 'pg',
//       connection: process.env.TEST_DB_URL
//     })

//     app.set('db', db)
//   })

//   beforeEach('seed tables', () => seedTables(db, {
//     users: users(), 
//     images: images(), 
//     stories: stories(),
//   }))

//   afterEach(() => cleanTables(db))
//   after('disconnect from db', ()=> db.destroy())

//   describe('POST /api/login', () => {
//     it('responds with 200 and JWT token', () => {
//       return supertest(app)
//         .post('/api/login')
//         .send()
//     })
//   })
// })