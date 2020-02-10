import React from 'react';
import './EventModule.css';
import Utils from '../../services/utils';
export default function EventModule(props) {
    return (
        <div className="event-module">
            { Utils.formatDate(props.date_of_event) }
          
            <h4>{ props.eventname.split(' ')[0] }</h4>
            <p>{props.time_start}</p>
            <p>{props.time_end}</p>
        </div>
    )
}
