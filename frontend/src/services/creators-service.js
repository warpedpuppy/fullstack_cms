import Config from '../config';
export default {
    async getAllUsers() {
        let res = await fetch(`${Config.API_ENDPOINT}/creators`);

        return await ((!res.ok)
            ? res.json().then(e => Promise.reject(e))
            : res.json())
    }

}