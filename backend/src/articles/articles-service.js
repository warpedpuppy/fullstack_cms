const Config = require('../config');

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
    }
}
module.exports = ArticlesService;