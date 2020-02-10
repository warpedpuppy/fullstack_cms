import React, { Component } from 'react';
import './EventEdit.css';
import EventService from '../../../services/events-services';
import UploadService from '../../../services/uploader-service';
export default class EventEdit extends Component {
    state = {eventTitles: [], eventToEdit: {}, storeImgUrl: null, formDisabled: false}
    componentDidMount () {
       this.getEventTitles();
       this.hours = Array.from(Array(12).keys()).map( (hour, i) => {
            let h = hour + 1;
            return <option value={h} key={i}>{h}</option>
        })
        this.minutes = ["00", "15", "30", "45"].map( (minute, i) => {
            return <option value={minute} key={minute}>{minute}</option>
        })
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
        let temp = {};
        temp[e.target.name] = e.target.value;
        let form = document.getElementById("event-edit-form")
        let time_start = `${form.hour_start.value}:${form.minutes_start.value} ${form.am_pm_start.value}`
        let time_end = `${form.hour_end.value}:${form.minutes_end.value} ${form.am_pm_end.value}`
        let eventToEdit = Object.assign({}, this.state.eventToEdit, temp, {time_start, time_end});
        console.log(eventToEdit)
        this.setState({eventToEdit})
    }
    deleteEventHandler = async (e) => {
        e.preventDefault();
        let res = await EventService.deleteEvent(this.state.eventToEdit.id);
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
                        <label>time start: </label>
                        <select 
                        name="hour_start" 
                        onChange={this.onChangeEventHandler}
                        defaultValue={this.state.eventToEdit.time_start.split(":")[0]}
                        >{this.hours}</select> : 
                        <select 
                        name="minutes_start" 
                        onChange={this.onChangeEventHandler}
                        defaultValue={this.state.eventToEdit.time_start.split(":")[1].split(" ")[0]}
                        >{this.minutes}</select> 
                        <select 
                        name="am_pm_start" 
                        onChange={this.onChangeEventHandler} 
                        defaultValue={this.state.eventToEdit.time_start.split(":")[1].split(" ")[1]}
                        
                        >
                            <option value="am">am</option>
                            <option value="pm">pm</option>
                        </select>

                    </div>
                    <div>
                        <label>time end: </label>
                        <select 
                        name="hour_end" 
                        onChange={this.onChangeEventHandler}
                        defaultValue={this.state.eventToEdit.time_end.split(":")[0]}
                        >{this.hours}</select> : 
                        <select 
                        name="minutes_end" 
                        onChange={this.onChangeEventHandler}
                        defaultValue={this.state.eventToEdit.time_end.split(":")[1].split(" ")[0]}
                        >{this.minutes}</select> 
                        <select 
                        name="am_pm_end" 
                        onChange={this.onChangeEventHandler} 
                        defaultValue="pm"
                        defaultValue={this.state.eventToEdit.time_start.split(":")[1].split(" ")[1]}
                        >
                            <option value="am">am</option>
                            <option value="pm">pm</option>
                        </select>

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
