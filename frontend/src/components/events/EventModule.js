import React from 'react';
import './EventModule.css';
import Utils from '../../services/utils';
import { useHistory } from "react-router-dom";
export default function EventModule(props) {
    let history = useHistory();
    function goToEvent(){
        history.push(`/event/${props.id}`)
    }
    return (
        <div className="event-module" onClick={goToEvent}>
            { Utils.formatDate(props.date_of_event) }
          
            <h4>{ props.eventname.split(' ')[0] }</h4>
            <p>{props.time_start}</p>
            <p>{props.time_end}</p>
        </div>
    )
}
