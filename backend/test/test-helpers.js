// import DemoService from '../src/demo/demo-service';
const faker = require('faker');
const bcrypt = require('bcryptjs')
function cleanTables(db) {
    return db.transaction(trx =>
      trx.raw(
        `TRUNCATE
          ${process.env.USERS_TABLE},
          ${process.env.ARTICLES_TABLE}
        `
      )
      .then(
         () =>
        Promise.all(
        [trx.raw(`ALTER SEQUENCE ${process.env.ARTICLES_TABLE}_id_seq minvalue 0 START WITH 1`),
          trx.raw(`ALTER SEQUENCE ${process.env.USERS_TABLE}_id_seq minvalue 0 START WITH 1`),
          trx.raw(`SELECT setval('${process.env.ARTICLES_TABLE}_id_seq', 0)`),
          trx.raw(`SELECT setval('${process.env.USERS_TABLE}_id_seq', 0)`),
        ])
      )
    )
  }
  function makeUsersArray() {
    let users = [];
    for (let i = 0; i < 20; i ++) {
        users.push({username: faker.name.firstName(), password: bcrypt.hashSync('password', 1), img_url: faker.image.avatar()})
    }
    return users;
  }
  function makeArticlesArray(users) {
    let articles = [];
    for(let i = 0; i < users.length; i ++) {
      for (let j = 0; j < 5; j ++) {
          let userIndex = 2;
          articles.push({
              title: faker.lorem.sentence(),
              content: faker.lorem.paragraphs(),
              author_id: users[userIndex].id,
              img_url: faker.image.animals()
          })
      }
    }
      return articles;
  }

  function seedUsers(db, users) {

    return db.into(process.env.USERS_TABLE).insert(users)
      .then(() =>{
          // update the auto sequence to stay in sync
        db.raw(
          `SELECT setval('${process.env.USERS_TABLE}_id_seq', ?)`,
          [users[users.length - 1].id],
        )
      
      })
      
  }

  function seedArticlesTables(db, users, articles) {
 
    return db.transaction(async trx => {
      await seedUsers(trx, users)
      await trx.into(process.env.ARTICLES_TABLE).insert(articles)
      // // update the auto sequence to match the forced id values
      // await trx.raw(
      //   `SELECT setval('blogful_articles_id_seq', ?)`,
      //   [articles[articles.length - 1].id],
      // )
    })
  }
  module.exports = {
    cleanTables,
    makeArticlesArray,
    makeUsersArray,
    seedArticlesTables
  }
  