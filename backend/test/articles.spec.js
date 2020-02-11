const knex = require('knex')
const app = require('../src/app')
const helpers = require('./test-helpers')

describe('Articles Endpoints', function() {
  let db
  const users = helpers.makeUsersArray();
  const articles = helpers.makeArticlesArray(users);
  const creater_obj = helpers.makeCreatorObject(users, articles)

  before('make knex instance', () => {
      db = knex({
      client: 'pg',
      connection: process.env.TEST_DB_URL,
      })
      app.set('db', db)
  })

  describe(`GET /api/articles`, () => {
    context(`Given no articles`, () => {
      it(`responds with 200 and an empty list`, () => {
        return supertest(app)
          .get('/api/articles')
          .expect(200, { success: true, result: [] })
      })
    })

    context('Given there are articles in the database', () => {
        beforeEach('insert articles',  () => {
            helpers.seedArticlesTables(db, users, articles)
        } )

        after('disconnect from db', () => db.destroy())

        before('cleanup', () => helpers.cleanTables(db))

        afterEach('cleanup', () => helpers.cleanTables(db))
  
        it('responds with 200 and all of the articles', () => {
          return supertest(app)
            .get('/api/articles')
            .expect(200)
            .then(res => {
              expect(res.body.success).to.equal(true)
              expect(res.body.result[0]).to.have.keys(['title', 'description', 'content', 'img_url', 'author_id', 'date_created', 'date_modified', 'id'])
            })
        })
      })
      context('posting an article to the db', () => {
        it('responds with 200 and all of the articles', () => {
          return supertest(app)
            .get('/api/articles')
            .expect(200)
            .then(res => {
              expect(res.body.success).to.equal(true)
              expect(res.body.result[0]).to.have.keys(['title', 'description', 'content', 'img_url', 'author_id', 'date_created', 'date_modified', 'id'])
            })
        })
      })
      })


})


