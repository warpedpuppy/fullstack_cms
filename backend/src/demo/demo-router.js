const express = require('express')
const demoRouter = express.Router()
const { requireAuth } = require('../middleware/auth-middleware')
var faker = require('faker');
const DemoService = require('./demo-service');
const AuthService = require('../auth/auth-service')

demoRouter
.post('/make-demo-creators', (req, res) => {
    let users = [];
    AuthService.hashPassword("test")
    .then(password => {
        for (let i = 0; i < 20; i ++) {
            users.push({username: faker.Name.firstName(), password})
        }
        DemoService.insertDemoUsers(req.app.get('db'), users)
        .then(result => {
              res
                .status(201)
                .json({users})
        })
    })
})
.delete('/remove-all-but-admin', (req, res) => {
    DemoService.removeAllButAdmin(req.app.get('db'))
    .then(result => {
        res
        .status(200)
        .json({result})
    })
})
  


module.exports = demoRouter;