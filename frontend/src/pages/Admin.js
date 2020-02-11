import React, { Component } from 'react';
import Register from '../components/registerLogIn/Register';
import Login from '../components/registerLogIn/Login';
import SiteContext from '../SiteContext';
import TokenService from '../services/token-service';
import './Admin.css';
import ArticleCreate from '../components/admin/articles/ArticleCreate';
import EventCreate from '../components/admin/events/EventCreate';
import CreateDemoUsers from '../components/admin/CreateDemoUsers';
import ArticleEdit from '../components/admin/articles/ArticleEdit';
import EventEdit from '../components/admin/events/EventEdit';
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
            let tabs = user === 'admin' ?
                <div className='tabs'>
                    <span>home</span>
                    <span>article create</span>
                    <span>article edit</span>
                    <span>event create</span>
                    <span>event edit</span>
                </div> :
                <div className='tabs'>
                    <span>home</span>
                    <span>article create</span>
                    <span>article edit</span>
                </div>
            ;


            let homePanel = user === 'admin' ?
                    <CreateDemoUsers />: 
                    null;

            return (
                <>
                     
                {tabs}
                
                <div className='tab-panel'><h3>welcome {user}  </h3>{ homePanel }</div>
                <hr /> <hr /> <hr /> <hr /> <hr /> <hr /> <hr /> <hr />
                <div className='tab-panel'><ArticleEdit /></div>
                <hr /> <hr /> <hr /> <hr /> <hr /> <hr /> <hr /> <hr />
                <div className='tab-panel'><EventCreate /></div>
                <hr /> <hr /> <hr /> <hr /> <hr /> <hr /> <hr /> <hr />
                <div className='tab-panel'><ArticleCreate /></div>
                <hr /> <hr /> <hr /> <hr /> <hr /> <hr /> <hr /> <hr />
                <div className='tab-panel'>{eventEdit}</div>
                </>
            )
        }
       
    }
}
Admin.contextType = SiteContext;