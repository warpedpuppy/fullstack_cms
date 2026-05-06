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
import GetBucketContents from '../components/admin/GetBucketContents';
export default class Admin extends Component {
    state = {
        activeTab: 'home-shell'
    }

    tabClick = (e) => {
        this.setState({ activeTab: e.target.dataset.ref });
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
            let eventEdit = TokenService.parseJwt(TokenService.getAuthToken()).sub === 'admin' ? <EventEdit /> : null ;
            let user = TokenService.parseJwt(TokenService.getAuthToken()).sub;
            let tabs = user === 'admin' ?
                <div className='tabs'>
                    <span onMouseDown={this.tabClick} data-ref='home-shell' className={this.state.activeTab === 'home-shell' ? 'active' : ''}>home</span>
                    <span onMouseDown={this.tabClick} data-ref='article-create-shell' className={this.state.activeTab === 'article-create-shell' ? 'active' : ''}>article create</span>
                    <span onMouseDown={this.tabClick} data-ref='article-edit-shell' className={this.state.activeTab === 'article-edit-shell' ? 'active' : ''}>article edit</span>
                    <span onMouseDown={this.tabClick} data-ref='event-create-shell' className={this.state.activeTab === 'event-create-shell' ? 'active' : ''}>event create</span>
                    <span onMouseDown={this.tabClick} data-ref='event-edit-shell' className={this.state.activeTab === 'event-edit-shell' ? 'active' : ''}>event edit</span>
                </div> :
                <div className='tabs'>
                    <span onMouseDown={this.tabClick} data-ref='home-shell' className={this.state.activeTab === 'home-shell' ? 'active' : ''}>home</span>
                    <span onMouseDown={this.tabClick} data-ref='article-create-shell' className={this.state.activeTab === 'article-create-shell' ? 'active' : ''}>article create</span>
                    <span onMouseDown={this.tabClick} data-ref='article-edit-shell' className={this.state.activeTab === 'article-edit-shell' ? 'active' : ''}>article edit</span>
                </div>
            ;


            let homePanel = user === 'admin' ?
                    <>
                    <CreateDemoUsers />
                    <GetBucketContents />
                    </>
                    : 
                    null;

            return (
                <>
                {tabs}
                <div className='tab-panels'>
                    <div className={`tab-panel ${this.state.activeTab === 'home-shell' ? 'active' : ''}`} id='home-shell'><h3>welcome {user}  </h3>{ homePanel }</div>
                    <div className={`tab-panel ${this.state.activeTab === 'article-create-shell' ? 'active' : ''}`} id='article-create-shell'><ArticleCreate /></div>
                    <div className={`tab-panel ${this.state.activeTab === 'article-edit-shell' ? 'active' : ''}`} id='article-edit-shell'><ArticleEdit /></div>
                    {user === 'admin' && <div className={`tab-panel ${this.state.activeTab === 'event-create-shell' ? 'active' : ''}`} id='event-create-shell'><EventCreate /></div>}
                    {user === 'admin' && <div className={`tab-panel ${this.state.activeTab === 'event-edit-shell' ? 'active' : ''}`} id='event-edit-shell'>{eventEdit}</div>}
                </div>
                </>
            )
        }
       
    }
}
Admin.contextType = SiteContext;