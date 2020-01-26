const express = require('express')
const articlesRouter = express.Router()
const { requireAuth } = require('../middleware/auth-middleware')
const bcrypt = require('bcryptjs')
const jsonBodyParser = express.json();
const ArticleService = require('./articles-service');

articlesRouter
.post('/', requireAuth, jsonBodyParser, async (req, res) => {
    let { title, description, content } = req.body;
    let obj = { title, description, content }
    obj.author_id = req.tokenData.user_id;

    let result = await ArticleService.insertArticle(req.app.get('db'), obj)

    if (result) {
        res
        .status(200)
        .json({success: true, result})
    } else {
        res
        .status(500)
        .json({success: false})
    }

})

module.exports = articlesRouter;