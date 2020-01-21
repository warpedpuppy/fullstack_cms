const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('../config')
var faker = require('faker');

const DemoService = {
    insertDemoUsers(db, users) {
        return db(config.USERS_TABLE)
          .insert(users)
          .returning('*')
      },
    removeAllButAdmin(db) {
        db(config.USERS_TABLE)
        .whereNot({ username: 'admin' })
        .del()

        return db(config.USERS_TABLE)
        .whereNot({ username: 'admin' })
        .del()
    },
    insertFakeArticles(db, users) {
        let articles = [];
        var item = users[Math.floor(Math.random()*users.length)];
        for(let i = 0; i < users.length; i ++) {
            for (let j = 0; j < 5; j ++) {
                articles.push({
                    title: faker.Lorem.sentence(),
                    content: faker.Lorem.paragraphs(),
                    author_id: users[i].id,
                    img_url: faker.Image.abstractImage()
                })
            }
        }
        return db
          .insert(articles)
          .into(config.ARTICLES_TABLE)
          .returning('*')
          .then(([user]) => user)
    }
}
module.exports = DemoService;