const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('../config')

const CreatorsService = {
    getAllCreators (db) {
        db(config.USERS_TABLE)
        .returning('*')
        .then(res => res)
    },
    getCreatorAndArticleTitles(db, id, limit) {
        let limitString = (limit)?`LIMIT ${limit}`:``;
        //couldn't make this work with limiting second table
        // let str = `SELECT a.username, a.img_url, (SELECT jsonb_agg(jsonb_build_object(b.id, b.title)) FROM qr_articles b WHERE a.id = b.author_id ${limitString}) FROM qr_creators a WHERE a.id=${id}`;

        // let str = `SELECT a.username, a.img_url, b.id, b.title FROM qr_creators a JOIN qr_articles b ON b.author_id = a.id WHERE a.id=${id} ${limitString}`
        
        let str = `SELECT a.id, a.title, a.description, b.username, b.img_url as avatar FROM qr_articles a JOIN qr_creators b ON b.id = a.author_id WHERE a.author_id=${id} ${limitString};`
        return db
        .raw(str)
        .then(result => {
            return result.rows
        })
    },
    getAllCreatorsAndAllOfTheirArticles(db) {
        let str =  `SELECT u.id, u.username, u.img_url, (SELECT json_agg(t) AS articles FROM ${config.ARTICLES_TABLE} t WHERE u.id = t.author_id ) FROM ${config.USERS_TABLE} u`;
        return db
            .raw(str)
            .then(result => {
                return result.rows
            })
       
    },
    makeObj(users) {
        let returnObj = {};
        users.forEach( user => {
            if (!returnObj[user.username]) {
                returnObj[user.username] = user;
            }
        })
        return returnObj;
    },
    serializeUser (user) {
        return {
            id: user.id,
            username: user.username
        }
    }
}
module.exports = CreatorsService;