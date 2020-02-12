import React, { Component } from 'react'
import AuthServices from '../../services/auth-services';
import SiteContext from '../../SiteContext';
export default class Login extends Component {

    state = { responseMessage: ''}

    onSumbitHandler = async (e) => {
        e.preventDefault();
        const { username, password } = e.target;
        let result = await AuthServices.postLogin(username.value, password.value);
        this.context.setLoggedIn(result.login)
        username.value = '';
        password.value = '';
        if (result.error) {
            this.setState({responseMessage: result.error})
        }

    }

    render() {
        return (
            <div>
                <fieldset><legend>login</legend>
                <form onSubmit={this.onSumbitHandler}>
                    <input type="text" name="username" />
                    <input type="password" name="password" />
                    <input type="submit" />
                </form>
                <div>{ this.state.responseMessage }</div>
                </fieldset>
            </div>
        )
    }
}
Login.contextType = SiteContext;
