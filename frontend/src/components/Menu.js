import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import SiteContext from '../SiteContext';
import './Menu.css';
import TokenService from '../services/token-service';

export default class Menu extends Component {

    logout = (e) => {
        e.preventDefault();
        TokenService.clearAuthToken();
       this.context.setLoggedIn(false)
    }
    render() {
        return (
            <nav>
                <Link to="/">home</Link>
                <Link to="/events">events</Link>
                <Link to="/admin">admin</Link>
                <button 
                onClick={this.logout}
                className={ this.context.loggedIn ? 'show' : 'hide'}>log out</button>
            </nav>
        )
    }
}
Menu.contextType = SiteContext;