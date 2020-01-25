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
                console.log("3", result)
                
                DemoService.insertFakeArticles(db, result)
                .then(articles => {
                    console.log("4", articles)
                    // res
                    // .status(201)
                    // .json({users, articles})
                    // console.log({users, articles})
                    // return {users, articles};
                })
            })
        })
    },
    insertDemoUsers(db, users) {
        return db(config.USERS_TABLE)
          .insert(users)
          .returning('*')
      },
    removeAllButAdmin(db) {
        db(config.ARTICLES_TABLE)
        .del()

        return db(config.USERS_TABLE)
        .whereNot({ username: 'admin' })
        .del()
    },
    insertFakeArticles(db, users) {
        let articles = [];
        //var item = users[ Math.floor( Math.random() * users.length ) ];
       // console.log(users)

        for(let i = 0; i < users.length; i ++) {
            for (let j = 0; j < 5; j ++) {
                let userIndex = 2;
                console.log("id = ", userIndex);
                articles.push({
                    title: faker.lorem.sentence(),
                    content: faker.lorem.paragraphs(),
                    author_id: users[userIndex].id,
                    img_url: faker.image.animals()
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