import React, { Component } from 'react';
import Register from '../components/registerLogIn/Register';
import Login from '../components/registerLogIn/Login';
import SiteContext from '../SiteContext';
import './Admin.css';
export default class Admin extends Component {
    render() {

        if (!this.context.loggedIn) {
            return (
                <div>
                    <Register />
                    <Login />
                </div>
            )
        } else {
            return (
                <h1>logged in</h1>
            )
        }
       
    }
}
Admin.contextType = SiteContext;