import Config from '../config';
import TokenService from '../services/token-service';
const ArticleService = {
    async getHomePageArticles() {
        let res = await fetch(`${Config.API_ENDPOINT}/articles`)
        let resJson = await res.json();
        return resJson
    },
    async getArticleTitles (offset, increment) {
        let res = await fetch(`${Config.API_ENDPOINT}/articles/titles-for-edit?offset=${offset}&increment=${increment}`, {
            headers: {
                authorization: `Bearer ${TokenService.getAuthToken()}`
            }
        })
        let resJson = await res.json();

        if (resJson) {
            return resJson;
        }
    },
    async getArticleForEdit(index) {
        let res = await fetch(`${Config.API_ENDPOINT}/articles/article-for-edit/${index}`, {
            headers: {
                authorization: `Bearer ${TokenService.getAuthToken()}`
            }
        })
        let resJson = await res.json();
        return resJson;
    },
    async submitEditedArticle(obj) {
        let res = await fetch(`${Config.API_ENDPOINT}/articles/article-for-edit`, {
            method: "POST",
            headers: {
                authorization: `Bearer ${TokenService.getAuthToken()}`,
                'content-type': 'application/json'
            },
            body: JSON.stringify(obj)
        })
        let resJson = await res.json();
        return resJson;

    },
    async deleteArticle (id) {
       
        let res = await fetch(`${Config.API_ENDPOINT}/articles/delete-article`, {
            method: "DELETE",
            headers: {
                authorization: `Bearer ${TokenService.getAuthToken()}`,
                'content-type': 'application/json'
            },
            body: JSON.stringify({id})
        })
        let resJson = await res.json();
        return resJson;
    }
}
export default ArticleService;