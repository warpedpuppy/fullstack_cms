import React, { Component } from 'react'
import EventModule from './EventModule';
import './EventBand.css';
import Config from '../../config';

export default class EventBand extends Component {
    state = {events: []}
    componentDidMount () {
        this.getEvents();
    }
    getEvents = async () => {
        let res = await fetch(`${Config.API_ENDPOINT}/events/`)
        let resJson = await res.json();
        this.setState({events: resJson.result})
    }
    render() {
        let events = this.state.events.map( (event, i) => {
           return <EventModule key={i} {...event} />
        })
        return (
            <div className='event-band'>
                {events}
            </div>
        )
    }
}
