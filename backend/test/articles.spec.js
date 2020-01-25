const knex = require('knex')
const app = require('../src/app')
const helpers = require('./test-helpers')

describe.skip('Articles Endpoints', function() {
//   let db

//   const {
//     testUsers,
//     testArticles,
//     testComments,
//   } = helpers.makeArticlesFixtures()

  describe(`GET /api/articles`, () => {
    context(`Given no articles`, () => {
      it(`responds with 200 and an empty list`, () => {
        return supertest(app)
          .get('/api/articles')
          .expect(200, [])
      })
    })

    // context('Given there are articles in the database', () => {
    //     beforeEach('insert articles', () =>
    //       helpers.seedArticlesTables(
    //         db,
    //         testUsers,
    //         testArticles,
    //         testComments,
    //       )
    //     )
  
    //     it('responds with 200 and all of the articles', () => {
    //       const expectedArticles = testArticles.map(article =>
    //         helpers.makeExpectedArticle(
    //           testUsers,
    //           article,
    //           testComments,
    //         )
    //       )
    //       return supertest(app)
    //         .get('/api/articles')
    //         .expect(200, expectedArticles)
    //     })
    //   })


})




})
