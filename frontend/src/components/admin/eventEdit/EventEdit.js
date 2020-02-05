import React, { Component } from 'react';
import './EventEdit.css';
import EventService from '../../../services/events-services';
export default class EventEdit extends Component {
    state = {eventTitles: []}
    componentDidMount () {
       this.getEventTitles()
    }

    getEventTitles = async () => {
        let res = await EventService.getEventTitles();
        if (res.success) {
            this.setState({eventTitles: res.result})
        }
        
    }
    getEventDetails = async (id) => {
        let res = await EventService.getEventDetails(id);
        console.log(res)
    }

    render() {
        let titles = this.state.eventTitles.map((title, i) => {
            return <li onClick={() => this.getEventDetails(title.id) } key={i}>{title.id} {title.eventname} {title.date_of_event}</li>
        })
        return (
            <>
             <h1>EVENT EDIT</h1>
            <ul id="edit-events">
               {titles}
            </ul>
            </>
        )
    }
}
