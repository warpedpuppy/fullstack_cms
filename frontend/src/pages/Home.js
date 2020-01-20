import React, { Component } from 'react';
import BackendCall from '../components/BackendCall';

export default class Home extends Component {
    render() {
        return (
            <div>
                <h1>home</h1>
                <BackendCall />
            </div>
        )
    }
}
