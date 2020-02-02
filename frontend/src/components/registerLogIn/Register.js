import React, { Component } from 'react'
import AuthServices from '../../services/auth-services';
import TokenService from '../../services/token-service';
import SiteContext from '../../SiteContext';
export default class Register extends Component {

    onSumbitHandler = async (e) => {
        e.preventDefault();
        const { username, password } = e.target

        let result = await AuthServices.postRegister({
            username: username.value,
            password: password.value
        })
        username.value = '';
        password.value = '';
        
        console.log(result);
        if (result.success) {
            TokenService.saveAuthToken(result.authToken);
            //this.context.setLoggedIn(true)
        }
    }
    render() {
        return (
            <div>
                <fieldset><legend>register</legend>
                <form onSubmit={this.onSumbitHandler}>
                    <input type="text" name="username" />
                    <input type="password" name="password" />
                    <input type="submit" />
                </form>
                </fieldset>
            </div>
        )
    }
}
Register.contextType = SiteContext;