const express = require('express')
const demoRouter = express.Router()
const { requireAuth } = require('../middleware/auth-middleware')
var faker = require('faker');
const DemoService = require('./demo-service');
const bcrypt = require('bcryptjs')

demoRouter
.post('/make-demo-creators', requireAuth, async (req, res) => {
    
    if (req.tokenData.sub !== 'admin') return;

    let truncateAll = await DemoService.trucateAll(req.app.get('db'))
    if (truncateAll) {
        let resetKeys = await DemoService.resetKeys(req.app.get('db'))
        if (resetKeys) {
            let fakeEventResult = await DemoService.insertFakeEvents(req.app.get('db'))
            let usersResult = await DemoService.insertDemoUsers(req.app.get('db'), DemoService.createFakeUsers());
            if (usersResult) {
                let fakeArticleResult = await DemoService.insertFakeArticles(req.app.get('db'), usersResult);
                if(fakeArticleResult) {
                    res
                    .status(201)
                    .json({usersResult, fakeArticleResult, fakeEventResult})
                }
            }
        }
    }

})
.post('/create-fake-articles', (req, res) => {

})
.delete('/remove-all-but-admin', requireAuth, (req, res) => {
    DemoService.removeAllButAdmin(req.app.get('db'))
    .then(result => {
        res
        .status(200)
        .json({result})
    })
})
  


module.exports = demoRouter;