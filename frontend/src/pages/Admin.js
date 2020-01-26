import React, { Component } from 'react';
import Register from '../components/registerLogIn/Register';
import Login from '../components/registerLogIn/Login';
import SiteContext from '../SiteContext';
import TokenService from '../services/token-service';
import './Admin.css';
import ArticleCreate from '../components/admin/ArticleCreate';
export default class Admin extends Component {
    render() {
        let user = TokenService.parseJwt(TokenService.getAuthToken()).sub;
        if (!this.context.loggedIn) {
            return (
                <div>
                    <Register />
                    <Login />
                </div>
            )
        } else {
            return (
                <>
                <h1>logged in {user}  </h1>
                <ArticleCreate />
                </>
            )
        }
       
    }
}
Admin.contextType = SiteContext;