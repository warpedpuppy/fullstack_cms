import React, { Component } from 'react';
import Register from '../components/registerLogIn/Register';
import Login from '../components/registerLogIn/Login';
import SiteContext from '../SiteContext';
import TokenService from '../services/token-service';
import './Admin.css';
import ArticleCreate from '../components/admin/ArticleCreate';
import Config from '../config';

export default class Admin extends Component {
    state = {disableButton: false}
    createFakeData = async (e) => {
        e.preventDefault();
        this.setState({enableButton: true})
        let res = await fetch(`${Config.API_ENDPOINT}/demo/make-demo-creators`, {method: "POST"})
        if (res.ok) {
            this.setState({enableButton: false})
        }
    }

    render() {
        if (!this.context.loggedIn) {
            return (
                <div>
                    <Register />
                    <Login />
                </div>
            )
        } else {
            let user = TokenService.parseJwt(TokenService.getAuthToken()).sub;
            let buttons = user === 'admin' ?
            <button disabled={this.state.disableButton} onClick={this.createFakeData}>create fake data</button> : 
            <></>;

            return (
                <>
                <h1>logged in {user}  </h1>
                { buttons }
                <ArticleCreate />
                </>
            )
        }
       
    }
}
Admin.contextType = SiteContext;