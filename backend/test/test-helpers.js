// import DemoService from '../src/demo/demo-service';
const faker = require('faker');
const bcrypt = require('bcryptjs')
function cleanTables(db) {
    return db.transaction(trx =>
      trx.raw(
        `TRUNCATE
          ${process.env.USERS_TABLE},
          ${process.env.ARTICLES_TABLE} CASCADE
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
    for (let i = 0; i < 5; i ++) {
      let index = i + 1;
      users.push({id: index, username: faker.name.firstName(), password: bcrypt.hashSync('password', 1), img_url: faker.image.avatar()})
     
    }
    return users;
  }
  function makeArticlesArray(users) {
    let articles = [];
    for(let i = 0; i < users.length; i ++) {
      for (let j = 0; j < 1; j ++) {
          let index = i + 1;
          articles.push({
              title: faker.lorem.sentence(),
              content: faker.lorem.paragraphs(),
              author_id: index,
              img_url: faker.image.animals()
          })
      }
    }
    return articles;
  }

  function makeCreatorObject (users, articles) {
   
      let obj = {};
      for (i = 0; i < users.length; i++) {
        if(!obj[users[i].username]) obj[users[i].username] = {};

        obj[users[i].username] = Object.assign({}, users[i]);
        obj[users[i].username].articles = articles.filter(article => article.author_id === users[i].id);
        delete obj[users[i].username].password;
      }
      return obj;
    }

  function seedUsers(db, users) {

    return db.into(process.env.USERS_TABLE).insert(users)
      .then((res) =>{
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
    seedArticlesTables,
    makeCreatorObject
  }
  