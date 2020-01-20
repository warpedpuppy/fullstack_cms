import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import SiteContext from '../SiteContext';

export default class Menu extends Component {
    render() {
        return (
            <nav>
                <Link to="/">home</Link>
                <Link to="/page2">page 2</Link>
            </nav>
        )
    }
}
Menu.contextType = SiteContext;