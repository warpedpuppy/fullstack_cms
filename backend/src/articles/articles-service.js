const Config = require('../config');

const ArticlesService = {
    insertArticle: function (db, obj) {
        return db(Config.ARTICLES_TABLE)
            .insert(obj)
            .returning("*")
            .then(([article]) => article)
    }
}
module.exports = ArticlesService;