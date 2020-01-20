const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('../config')

const CreatorsService = {
    getAllCreators(db) {
        return db(config.USERS_TABLE)
        .returning('*')
    },
    serializeUser (user) {
        return {
            id: user.id,
            username: user.username
        }
    }
}
module.exports = CreatorsService;