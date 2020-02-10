import React, { Component } from 'react';
import './EventEdit.css';
import EventService from '../../../services/events-services';
import UploadService from '../../../services/uploader-service';
export default class EventEdit extends Component {
    state = {eventTitles: [], eventToEdit: {}, storeImgUrl: null, formDisabled: false}
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
            this.setState({eventToEdit: res.result[0], storeImgUrl: res.result[0].img_url})
        }
    }
    onChangeEventHandler = (e) => {
        console.log(e.target.name, e.target.value)
        let temp = {};
        temp[e.target.name] = e.target.value;
        let eventToEdit = Object.assign({}, this.state.eventToEdit, temp);
        this.setState({eventToEdit})
    }
    deleteEventHandler = async (e) => {
        e.preventDefault();
        let res = await EventService.deleteEvent(this.state.eventToEdit.id);
        console.log(res)
        if(res.success) {
            this.setState({eventToEdit: {}, storeImgUrl: null, formDisabled: false})
            this.getEventTitles()
        }
    }
    onEditFormSubmitHandler = async (e) => {
        e.preventDefault();
        this.setState({formDisabled: true})
        if (this.state.storeImgUrl === this.state.eventToEdit.img_url) {

            let res = await EventService.submitEditedEvent(this.state.eventToEdit);

            if (res.success) {
                this.setState({eventToEdit: {}, storeImgUrl: null, formDisabled: false})
                this.getEventTitles();
            }
        } else {


            //upload new image
            let photoName =  UploadService.createFileNames(this.state.eventToEdit, 'edit-event-image')
            let res = await UploadService.initUpload('edit-event-image', photoName.imageName);

            //then 
            if (res) {

                let objForUpload = Object.assign({}, this.state.eventToEdit, {img_url: photoName.img_url})
                let res2 = await EventService.submitEditedEvent(objForUpload);

                if (res2.success) {
                    this.setState({eventToEdit: {}, storeImgUrl: null, formDisabled: false})
                    this.getEventTitles();
                }
            }

        }
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
                <button onClick={ this.deleteEventHandler }>delete event</button>
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
                        <img src={this.state.storeImgUrl} alt={this.state.eventToEdit.eventname} />
                        <input 
                        onChange={ this.onChangeEventHandler} 
                        name="img_url" 
                        id="edit-event-image"
                        type="file" />
                    </div>
                    <div>
                        <input type="submit" disabled={this.state.formDisabled} />
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
