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
        <div className="card event-module" style={{'width': '10rem'}} onClick={goToEvent}>
            <img src={`/bmps/${props.img_url}`} class="card-img-top" alt="..."></img>
            <div className="card-body">
                
            
                <h5 className="card-title">{ props.eventname}</h5>
                <p className="card-text">{ Utils.formatDate(props.date_of_event) }</p>
                
                <p className="card-text">{props.time_start} to {props.time_end}</p>
            </div>
        </div>
    )
}
