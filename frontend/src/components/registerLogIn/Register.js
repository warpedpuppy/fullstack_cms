import React, { Component } from 'react'
import AuthServices from '../../services/auth-services';

export default class Register extends Component {

    onSumbitHandler = (e) => {
        e.preventDefault();
        const { username, password } = e.target

        AuthServices.postRegister({
            username: username.value,
            password: password.value
        })
        .then(user => {
       
            username.value = ''
            password.value = ''
            //this.props.onRegistrationSuccess()
        })
        .catch(res => {
            //this.setState({ error: res.error })
        })
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
