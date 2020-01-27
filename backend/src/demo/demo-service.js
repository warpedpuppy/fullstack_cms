const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('../config')
const faker = require('faker');
const AuthService = require('../auth/auth-service');
const DemoService = {
    deleteUsersCreateUsersCreateArticles(db){

        DemoService.removeAllButAdmin(db)
        .then(result => {
            let users = [];
            for (let i = 0; i < 20; i ++) {
                users.push({username: faker.name.firstName(), password: bcrypt.hashSync("test", 1), img_url: faker.image.avatar()})
            }
            DemoService.insertDemoUsers(db, users)
            .then(result => {
                DemoService.insertFakeArticles(db, result)
                .then(articles => {
                    res
                    .status(201)
                    .json({users, articles})
                })
            })
        })
    },
    insertDemoUsers(db, users) {
        return db(config.USERS_TABLE)
          .insert(users)
          .returning('*')
      },
    async removeAllButAdmin(db) {

        // db.raw(`TRUNCATE ${config.USERS_TABLE} CASCADE`);
        // db.raw(`ALTER SEQUENCE ${config.USERS_TABLE}_id_seq RESTART`);

        let res = await db.raw(`TRUNCATE ${config.ARTICLES_TABLE} CASCADE`)
        if (res) {
            let res2 = await db.raw(`ALTER SEQUENCE ${config.ARTICLES_TABLE}_id_seq RESTART`)
            if (res2) {
                 return db(config.USERS_TABLE)
                    .whereNot({ username: 'admin' })
                    .del()
            }
        }
    },
    insertFakeArticles(db, users) {
        let articles = [];
        for(let i = 0; i < users.length; i ++) {
            for (let j = 0; j < 5; j ++) {
                let userIndex = i + 1;
                articles.push({
                    title: faker.lorem.sentence(),
                    description: faker.lorem.paragraphs(),
                    content: faker.lorem.paragraphs(),
                    author_id: users[i].id,
                    img_url: '/bmps/IMG_7548.jpeg'
                })
            }
        }
        //console.log("6", articles)
        return db
          .insert(articles)
          .into(config.ARTICLES_TABLE)
          .returning('*')
          .then(([user]) => user)
    }
}
module.exports = DemoService;