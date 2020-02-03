const express = require('express')
const articlesRouter = express.Router()
const { requireAuth } = require('../middleware/auth-middleware')
const bcrypt = require('bcryptjs')
const jsonBodyParser = express.json();
const ArticleService = require('./articles-service');

articlesRouter
.post('/', requireAuth, jsonBodyParser, async (req, res) => {
    let { title, description, content, img_url } = req.body;
    let obj = { title, description, content, img_url }
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
.get('/article', async (req, res) => {

    let obj = {id: req.query.id, author: req.query.author};

    let result = await ArticleService.getArticle(req.app.get('db'), obj)
    if (result) {
        if(result[0].username === obj.author) {
            res
            .status(200)
            .json({success: true, result:result[0]})
        } else {
            res
            .status(200)
            .json({success: false, result: []})
        }
       
    } else {
        res
        .status(500)
        .json({success: false})
    }
})
.get('/article-for-edit', requireAuth, async (req, res) => {
    let obj = {id: req.query.id};
    let result = await ArticleService.getArticleForEdit(req.app.get('db'), obj)
    if (result) {
        console.log(result)
        res
        .status(200)
        .json({success: true, result})
    }
})
.get('/titles-for-edit', requireAuth, async (req, res) => {
    let { user_id } = req.tokenData;
    let result = await ArticleService.getTitlesForEdit(req.app.get('db'), user_id)
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
.get('/', async (req, res) => {

    let result = await ArticleService.getHomePageArticles(req.app.get('db'))
    
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