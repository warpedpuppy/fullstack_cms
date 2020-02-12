const Config = require('../config');
const xss = require('xss');

const ArticlesService = {
    insertArticle: function (db, obj) {
        console.log(obj)
        return db(Config.ARTICLES_TABLE)
            .insert(obj)
            .returning("*")
            .then(([article]) => article)
    },
    getHomePageArticles: function (db) {
        return db
        .raw(`SELECT a.id, a.title, a.description, a.img_url, a.date_created, b.username, b.id as author_id FROM ${Config.ARTICLES_TABLE} a JOIN ${Config.USERS_TABLE} b ON a.author_id = b.id ORDER BY a.date_created DESC LIMIT 30`)
        .then(articles => articles.rows)
    },
    getArticle: function(db, obj) {
        let str = `SELECT a.content, a.title, a.description, a.date_created, a.img_url, b.username, b.id as author_id FROM ${Config.ARTICLES_TABLE} a JOIN ${Config.USERS_TABLE} b ON b.id = a.author_id WHERE a.id=${obj.id} `;
        return db
        .raw(str)
        .then(article => article.rows)
    },
    getTitlesForEdit: function(db, author_id, offset, increment) {
        return db(Config.ARTICLES_TABLE)
        .select(`id`, `title`)
        .limit(increment)
        .offset(offset)
        .where({author_id})
        .then(res => {
            return res.map( item => {
                return {
                    id: xss(item.id),
                    title: xss(item.title)
                }
            })
        })

    },
    getArticleForEdit: function(db, id) {
        return db(Config.ARTICLES_TABLE)
        .where({id})
        .then(res => {
            let obj = res[0];
            return {
                id: xss(obj.id),
                title: xss(obj.title),
                description: xss(obj.description),
                content: xss(obj.content),
                img_url: xss(obj.img_url)
            }
        })
    },
    postArticleForEdit: function(db, obj){
        let date = new Date();
        return db(Config.ARTICLES_TABLE)
        .where({id: obj.id})
        .update({
            title: obj.title,
            description: obj.description,
            content: obj.content,
            img_url: obj.img_url,
            date_modified: date
        })
    },
    deleteArticle: function(db, id) {
        return db(Config.ARTICLES_TABLE)
        .where({id})
        .del()
    }
}
module.exports = ArticlesService;