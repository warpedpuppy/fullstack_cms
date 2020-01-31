import React, { Component } from 'react';
import Calendar from '../components/events/Calendar';
import './Events.css';
export default class Events extends Component {
    render() {
        return (
            <div>
                <Calendar />
            </div>
        )
    }
}
