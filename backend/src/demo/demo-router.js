const express = require('express')
const demoRouter = express.Router()
const { requireAuth } = require('../middleware/auth-middleware')
var faker = require('faker');
const DemoService = require('./demo-service');
const AuthService = require('../auth/auth-service')


demoRouter
.post('/make-demo-creators', (req, res) => {
    DemoService.removeAllButAdmin(req.app.get('db'))
    .then(result => {
        let users = [];
        AuthService.hashPassword("test")
        .then(password => {
            for (let i = 0; i < 20; i ++) {
                users.push({username: faker.Name.firstName(), password, img_url: faker.Image.avatar()})
            }

            DemoService.insertDemoUsers(req.app.get('db'), users)
            .then(result => {
                console.log('result = ', result)
                DemoService.insertFakeArticles(req.app.get('db'),result)
                .then(articles => {
                    res
                    .status(201)
                    .json({users, articles})
                })
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