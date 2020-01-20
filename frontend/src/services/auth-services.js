import config from '../config';
import TokenService from './token-service';

const AuthServices = {
    postRegister(user) {
        return fetch(`${config.API_ENDPOINT}/auth/register`, {
            method: 'POST',
            headers: {
            'content-type': 'application/json',
            },
            body: JSON.stringify(user),
        })
            .then(res =>
            (!res.ok)
                ? res.json().then(e => Promise.reject(e))
                : res.json()
            )
    },
  postLogin(username, password) {
    return fetch(`${config.API_ENDPOINT}/auth/login`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    })
      .then((res) => ((!res.ok)
        ? res.json().then((e) => Promise.reject(e))
        : res.json()))
      .then((res) => {
        if (res.authToken) {
          TokenService.saveAuthToken(res.authToken);
          return { login: true };
        }
        return { login: false };
      })
      .catch((error) => error);
  },

};

export default AuthServices;
