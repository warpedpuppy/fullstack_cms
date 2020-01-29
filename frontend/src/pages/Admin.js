import React, { Component } from 'react';
import Register from '../components/registerLogIn/Register';
import Login from '../components/registerLogIn/Login';
import SiteContext from '../SiteContext';
import TokenService from '../services/token-service';
import './Admin.css';
import ArticleCreate from '../components/admin/ArticleCreate';
import CreateDemoUsers from '../components/admin/CreateDemoUsers';

export default class Admin extends Component {
    
    render() {
        if (!TokenService.hasAuthToken()) {
            return (
                <div>
                    <Register />
                    <Login />
                </div>
            )
        } else {
            let user = TokenService.parseJwt(TokenService.getAuthToken()).sub;
            let buttons = user === 'admin' ?
            <CreateDemoUsers />: 
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