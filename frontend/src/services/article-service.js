import Config from '../config';
import TokenService from '../services/token-service';
const ArticleService = {
    async getHomePageArticles() {
        let res = await fetch(`${Config.API_ENDPOINT}/articles`)
        let resJson = await res.json();
        return resJson
    },
    async getArticleTitles () {
        let res = await fetch(`${Config.API_ENDPOINT}/articles/titles-for-edit`, {
            headers: {
                authorization: `Bearer ${TokenService.getAuthToken()}`
            }
        })
        let resJson = await res.json();

        if (resJson) {
            console.log(resJson);
            return resJson;
        }
    },
    async getArticleForEdit(index) {
        
        let res = await fetch(`${Config.API_ENDPOINT}/articles/article-for-edit?id=${index}`)
        let resJson = await res.json();
        return resJson;
    }
}
export default ArticleService;