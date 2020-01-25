const knex = require('knex')
const app = require('../src/app')
const helpers = require('./test-helpers')
const DemoService = require('../src/demo/demo-service');

describe('Creators Endpoints', function() {
   let db
    const users = helpers.makeUsersArray();
    const articles = helpers.makeArticlesArray(users);

    before('make knex instance', () => {
        db = knex({
        client: 'pg',
        connection: process.env.TEST_DB_URL,
        })
        app.set('db', db)
    })

  describe(`GET /api/creators`, () => {
    context(`Given no creators`, () => {
      it(`responds with 200 and an empty object`, () => {
        return supertest(app)
          .get('/api/creators')
          .expect(200, {"creators": {}})
      })
    })

    context('Given there are articles in the database',  () => {
        beforeEach('insert articles',  () => {
            helpers.seedArticlesTables(db, users, articles)
        } )

        after('disconnect from db', () => db.destroy())

        before('cleanup', () => helpers.cleanTables(db))

        afterEach('cleanup', () => helpers.cleanTables(db))
  
        it('responds with 200 and all of the articles', () => {
      
        return supertest(app)
            .get('/api/creators')
            .expect(200, {"creators": {}})
        })
      })


})




})
