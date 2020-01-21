const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('../config')

const CreatorsService = {
    getAllCreators(db) {
  
        let str =  `SELECT u.id, u.username, u.img_url, (SELECT json_agg(t) AS articles FROM ${config.ARTICLES_TABLE} t WHERE u.id = t.author_id ) FROM ${config.USERS_TABLE} u`;
        return db
            .raw(str)
            .then(result => result.rows)
       
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