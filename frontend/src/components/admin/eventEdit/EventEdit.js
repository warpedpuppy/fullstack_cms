import React, { Component } from 'react';
import './EventEdit.css';
import EventService from '../../../services/events-services';
export default class EventEdit extends Component {
    state = {eventTitles: [], eventToEdit: {}}
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
        if (res.success) {
            this.setState({eventToEdit: res.result[0]})
        }
    }
    onChangeEventHandler = (e) => {
        console.log(e.target.name, e.target.value)
        let obj = Object.assign({})
    }
    onEditFormSubmitHandler = (e) => {
        e.preventDefault();
    }
    render() {
        let titles = this.state.eventTitles.map((title, i) => {
            return <li onClick={() => this.getEventDetails(title.id) } key={i}>{title.id} {title.eventname} {title.date_of_event}</li>
        })
        if (Object.keys(this.state.eventToEdit).length) {
            let date = new Date(this.state.eventToEdit.date_of_event).toISOString().substr(0,10);
            return (
                <form id="event-edit-form" onSubmit={this.onEditFormSubmitHandler}>
                    <button onClick={ 
                        (e) => 
                        {e.preventDefault(); 
                    this.setState({eventToEdit:{}})}
                } >&times;</button>
                    <div>
                        <label htmlFor="eventname">event name</label>
                        <input 
                        onChange={ this.onChangeEventHandler} 
                        name="eventname" 
                        type="text" 
                        value={this.state.eventToEdit.eventname} />
                    </div>
                    <div>
                        <label htmlFor="description">event description</label>
                        <input 
                        onChange={ this.onChangeEventHandler} 
                        name="description" 
                        type="text" 
                        value={this.state.eventToEdit.description} />
                    </div>
                    <div>
                        <label htmlFor="description">event date</label>
                        <input 
                        onChange={ this.onChangeEventHandler} 
                        name="date_of_event" 
                        type="date" 
                        value={date} />
                    </div>
                    <div>
                        <label htmlFor="description">start hour</label>
                        <input 
                        onChange={ this.onChangeEventHandler} 
                        name="hour_start" 
                        type="text" 
                        value={this.state.eventToEdit.hour_start} />
                    </div>
                    <div>
                        <label htmlFor="description">end hour</label>
                        <input 
                        onChange={ this.onChangeEventHandler} 
                        name="hour_end" 
                        type="text" 
                        value={this.state.eventToEdit.hour_end} />
                    </div>
                    <div>
                        <img src={this.state.eventToEdit.img_url} alt={this.state.eventToEdit.eventname} />
                        <input 
                        onChange={ this.onChangeEventHandler} 
                        name="img_url" 
                        type="file" />
                    </div>
                    <div>
                        <input type="submit" />
                    </div>
                </form>
            )
        } else {
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
}
