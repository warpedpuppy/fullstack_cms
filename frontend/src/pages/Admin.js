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
    
    tabClick = (e) => {
        document.querySelector('.tabs span.active').classList.remove('active')
        e.target.classList.add('active');
        document.querySelector('.tab-panel.active').classList.remove('active')
        document.getElementById(`${e.target.dataset.ref}`).classList.add('active');
    }

    render() {
        const getZodiacSign = (username) => {
            const signs = ['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'];
            let sum = 0;
            if (username) {
                for (let i = 0; i < username.length; i++) {
                    sum += username.charCodeAt(i);
                }
            }
            return signs[sum % signs.length];
        };
       
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
                    <span onMouseDown={this.tabClick} data-ref='home-shell' className='active'>home</span>
                    <span onMouseDown={this.tabClick} data-ref='article-create-shell'>article create</span>
                    <span onMouseDown={this.tabClick} data-ref='article-edit-shell'>article edit</span>
                    <span onMouseDown={this.tabClick} data-ref='event-create-shell'>event create</span>
                    <span onMouseDown={this.tabClick}  data-ref='event-edit-shell'>event edit</span>
                </div> :
                <div className='tabs'>
                    <span onMouseDown={this.tabClick} data-ref='home-shell' className='active'>home</span>
                    <span onMouseDown={this.tabClick} data-ref='article-create-shell' >article create</span>
                    <span onMouseDown={this.tabClick} data-ref='article-edit-shell'>article edit</span>
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
                    <div className='tab-panel active' id='home-shell'><h3>welcome {user}. Your mystic user zodiac sign is {getZodiacSign(user)}!</h3>{ homePanel }</div>
                    <div className='tab-panel' id='article-create-shell'><ArticleCreate /></div>
                    <div className='tab-panel' id='article-edit-shell'><ArticleEdit /></div>
                    <div className='tab-panel' id='event-create-shell'><EventCreate /></div>
                    <div className='tab-panel' id='event-edit-shell'>{eventEdit}</div>
                </div>
                </>
            )
        }
       
    }
}
Admin.contextType = SiteContext;