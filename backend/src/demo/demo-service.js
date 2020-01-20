const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('../config')

const DemoService = {
    insertDemoUsers(db, users) {
        return db
          .insert(users)
          .into(config.USERS_TABLE)
          .returning('*')
          .then(([user]) => user)
      },
    removeAllButAdmin(db) {
        return db(config.USERS_TABLE)
        .whereNot({ username: 'admin' })
        .del()
    }
}
module.exports = DemoService;