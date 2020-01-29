import Config from '../config';
const ArticleService = {
    async getHomePageArticles() {
        let res = await fetch(`${Config.API_ENDPOINT}/articles`)
        let resJson = await res.json();
        return resJson
    }
}
export default ArticleService;