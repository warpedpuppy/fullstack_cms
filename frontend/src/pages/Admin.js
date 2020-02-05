import React, { Component } from 'react';
import Register from '../components/registerLogIn/Register';
import Login from '../components/registerLogIn/Login';
import SiteContext from '../SiteContext';
import TokenService from '../services/token-service';
import './Admin.css';
import ArticleCreate from '../components/admin/ArticleCreate';
import EventCreate from '../components/admin/EventCreate';
import CreateDemoUsers from '../components/admin/CreateDemoUsers';
import ArticleEdit from '../components/admin/articleEdit/ArticleEdit';
import EventEdit from '../components/admin/eventEdit/EventEdit';
export default class Admin extends Component {
    

    render() {
        let eventEdit = TokenService.parseJwt(TokenService.getAuthToken()).sub === 'admin' ? <EventEdit /> : null ;

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
            null;

            return (
                <>
                <h1>logged in {user}  </h1>
                { buttons }
                <hr /> <hr /> <hr /> <hr /> <hr /> <hr /> <hr /> <hr />
                <ArticleEdit />
                <hr /> <hr /> <hr /> <hr /> <hr /> <hr /> <hr /> <hr />
                <EventCreate />
                <hr /> <hr /> <hr /> <hr /> <hr /> <hr /> <hr /> <hr />
                <ArticleCreate />
                <hr /> <hr /> <hr /> <hr /> <hr /> <hr /> <hr /> <hr />
                {eventEdit}
                </>
            )
        }
       
    }
}
Admin.contextType = SiteContext;