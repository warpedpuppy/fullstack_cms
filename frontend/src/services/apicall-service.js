import TokenService from '../services/token-service';
export default {
    async TestAPICall(str) {
        let res = await fetch(str);

        return await ((!res.ok)
            ? res.json().then(e => Promise.reject(e))
            : res.json())
    },
    async TestProtectedAPICall(str) {
        console.log(str)
        let res = await fetch(str,
        {
            method: "POST", 
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${TokenService.getAuthToken()}`,
            },
            body: JSON.stringify({ testing: true }),
        });

        return await ((!res.ok)
            ? res.json().then(e => Promise.reject(e))
            : res.json())
    },


   
}