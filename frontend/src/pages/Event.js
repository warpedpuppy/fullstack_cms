import React, { Component } from 'react'
import EventService from '../services/events-services';
import Config from '../config';
export default class Event extends Component {
    state = {eventObj: {}}
    componentDidMount = () => {
        this.getEventDetails();
    }
    getEventDetails = async () => {
        let res = await EventService.getEventDetails(this.props.match.params.id);
        if(res.success) {
            console.log(res.result[0])
            this.setState({eventObj: res.result[0]})
        }
    }
    render() {
        let { eventname, description, date_of_event, time_start, time_end, img_url } = this.state.eventObj;
        return (
            <div>
                <h2>{eventname}</h2>
                <img src={`/bmps/${img_url}`} alt={eventname} />
                <div>{description}</div>
                <div>{date_of_event}</div>
                <div>{time_start}</div>
                <div>{time_end}</div>
            </div>
        )
    }
}
