import TokenService from '../services/token-service';
import Config from '../config';

export default {
    async getBucketContents() {
        let res = await fetch(`${Config.API_ENDPOINT}/admin/get-bucket-contents`, {
            headers: {
                authorization: `Bearer ${TokenService.getAuthToken()}`
            }
        });

        return await ((!res.ok)
            ? res.json().then(e => Promise.reject(e))
            : res.json())
    }


   
}