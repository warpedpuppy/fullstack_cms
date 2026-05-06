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
        <div className="card event-module" onClick={goToEvent}>
            <div className="card-img-wrapper">
                <img 
                    src={props.img_url ? `/bmps/${props.img_url}` : '/bmps/qr/default_image.jpeg'} 
                    onError={(e) => { e.target.onerror = null; e.target.src = '/bmps/qr/default_image.jpeg' }} 
                    className="card-img-top" 
                    alt={props.eventname || 'Event'} 
                />
            </div>
            <div className="card-body">
                <h5 className="card-title">{ props.eventname}</h5>
                <p className="card-date">{ Utils.formatDate(props.date_of_event) }</p>
                <p className="card-time">{props.time_start} to {props.time_end}</p>
            </div>
        </div>
    )
}
