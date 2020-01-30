const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('../config')
const faker = require('faker');
const AuthService = require('../auth/auth-service');
const DemoService = {
    articleQ: 10,
    userQ: 5,
    eventsQ: 100,
    deleteUsersCreateUsersCreateArticles(db){

        DemoService.removeAllButAdmin(db)
        .then(result => {
            let users = [];
            for (let i = 0; i < this.userQ; i ++) {
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
                let res3 = await db.raw(`TRUNCATE ${config.USERS_TABLE} CASCADE`)
                if(res3) {
                    let res4 = await db.raw(`ALTER SEQUENCE ${config.USERS_TABLE}_id_seq RESTART`);
                    if(res4) {
                        let res5 = db.raw(`TRUNCATE ${config.EVENTS_TABLE} CASCADE`)
                        if(res5) {
                            let res6 = await db.raw(`ALTER SEQUENCE ${config.EVENTS_TABLE}_id_seq RESTART`);
                            return res6;
                        }
                    }
                }
            }
        }
    },
    insertFakeArticles(db, users) {
        let articles = [];
        for(let i = 0; i < users.length; i ++) {
            for (let j = 0; j < this.articleQ; j ++) {
                let userIndex = i + 1;
                // articles.push({
                //     title: faker.lorem.sentence(),
                //     description: faker.lorem.paragraphs(),
                //     content: faker.lorem.paragraphs(),
                //     author_id: users[i].id,
                //     img_url: '/bmps/IMG_7548.jpeg'
                // })
                articles.push({
                    title: faker.Lorem.sentence(),
                    description: faker.Lorem.paragraphs(),
                    content: faker.Lorem.paragraphs(),
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
    },
    insertFakeEvents(db) {
        let events = [];
        for (let i = 0; i < this.eventsQ; i ++) {

            events.push({
                eventname: faker.Lorem.sentence(),
                description: faker.Lorem.paragraphs(),
                date_of_event: faker.Date.future(2),
                hour_start: "11:00AM",
                hour_end: "1:00PM",
                img_url: '/bmps/IMG_7548.jpeg'
            })
            // events.push({
            //     eventname: faker.lorem.sentence(),
            //     description: faker.lorem.paragraphs(),
            //     date_of_event: faker.providers.date_this_year(before_today=True, after_today=False),
            //     hour_start: fake.providers.time(pattern='%H:%M', end_datetime=None),
            //     hour_end: fake.providers.time(pattern='%H:%M', end_datetime=None),
            //     img_url: '/bmps/IMG_7548.jpeg'
            // })
        }

        return db
          .insert(events)
          .into(config.EVENTS_TABLE)
          .returning('*')
          .then(([user]) => user)
    }
}
module.exports = DemoService;