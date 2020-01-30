import React from 'react';
import './EventModule.css';
export default function EventModule(props) {
    return (
        <div className="event-module">
            {props.date_of_event}
        </div>
    )
}
