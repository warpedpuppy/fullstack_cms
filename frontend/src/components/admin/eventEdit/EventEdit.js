import React, { Component } from 'react';
import './EventEdit.css';
import EventService from '../../../services/events-services';
export default class EventEdit extends Component {

    componentDidMount () {
       this.getEventTitles()
    }

    getEventTitles = async () => {
        console.log('GET EVENT TITLES')
        let res = await EventService.getEventTitles();

        console.log(res)
    }

    render() {
        return (
            <div>
                <h1>EVENT EDIT</h1>
            </div>
        )
    }
}
