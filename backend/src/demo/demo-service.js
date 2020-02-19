const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('../config')
const faker = require('faker');
const AuthService = require('../auth/auth-service');
const DemoService = {
    articleQ: 10,
    userQ: 5,
    eventsQ: 100,
    createFakeUsers () {
        let users = [];    
        for (let i = 0; i < 20; i ++) {
            //users.push({username: faker.name.firstName(), password: bcrypt.hashSync('test', 1), img_url: faker.image.avatar()})
            users.push({username: faker.Name.firstName(), password: bcrypt.hashSync('test', 1), img_url: faker.Image.avatar()})
        }
        users.push({username: 'admin', password: bcrypt.hashSync('admin', 1), img_url: faker.Image.avatar()})
        return users;
    },
    insertDemoUsers(db, users) {
        return db(config.USERS_TABLE)
          .insert(users)
          .returning('*')
      },
    async trucateAll(db) {
        let test = await this.truncateEvents(db);
        let test2 = await this.truncateArticles(db);
        let test3 = await this.truncateUsers(db);
        if(test && test2 && test3)return true;
    },
    truncateEvents(db) {
        return db.raw(`TRUNCATE ${config.EVENTS_TABLE} CASCADE`);
    },
    truncateArticles(db) {
        return db.raw(`TRUNCATE ${config.ARTICLES_TABLE} CASCADE`);
    },
    truncateUsers(db) {
        return db.raw(`TRUNCATE ${config.USERS_TABLE} CASCADE`);
    },
    async resetKeys (db) {
        let test = await this.resetArticlesKey(db);
        let test2 = await this.resetArticlesKey(db);
        let test3 = await this.resetEventsKey(db);
        if(test && test2 && test3)return true;
    },
    resetUserNamesKey(db) {
        return db.raw(`ALTER SEQUENCE ${config.USERS_TABLE}_id_seq RESTART`);
    },
    resetArticlesKey(db) {
        return db.raw(`ALTER SEQUENCE ${config.ARTICLES_TABLE}_id_seq RESTART`);
    },
    resetEventsKey(db) {
        return db.raw(`ALTER SEQUENCE ${config.EVENTS_TABLE}_id_seq RESTART`);
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
            const today = new Date()
            const date_of_event = new Date(today)
            date_of_event.setDate(date_of_event.getDate() + i)
            events.push({
                eventname: faker.Lorem.sentence(),
                description: faker.Lorem.paragraphs(),
                date_of_event,
                time_start: "11:00 am",
                time_end: "1:00 pm",
                img_url: '/qr/default_image.jpeg'
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