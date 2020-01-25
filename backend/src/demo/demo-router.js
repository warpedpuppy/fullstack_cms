const express = require('express')
const demoRouter = express.Router()
const { requireAuth } = require('../middleware/auth-middleware')
var faker = require('faker');
const DemoService = require('./demo-service');
const AuthService = require('../auth/auth-service')
const bcrypt = require('bcryptjs')

demoRouter
.post('/make-demo-creators', (req, res) => {
    DemoService.removeAllButAdmin(req.app.get('db'))
    .then(result => {
        let users = [];      
        for (let i = 0; i < 20; i ++) {
            users.push({username: faker.name.firstName(), password: bcrypt.hashSync('test', 1), img_url: faker.image.avatar()})
        }
        DemoService.insertDemoUsers(req.app.get('db'), users)
        .then(result => {
            DemoService.insertFakeArticles(req.app.get('db'),result)
            .then(articles => {
                res
                .status(201)
                .json({users, articles})
            })
        })
    })
})
.post('/create-fake-articles', (req, res) => {

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