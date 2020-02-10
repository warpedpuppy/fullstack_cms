import React from 'react';
import './EventCreate.css';
import EventServices from '../../services/events-services';
import UploadService from '../../services/uploader-service';
import SiteContext from '../../SiteContext';
import Spinners from '../../components/Spinners';
export default class EventCreate extends React.Component {

    constructor(props){
        super(props)
        this.img = new Image();
        this.img.onload = this.imgLoadHandler;
        this.imgValue = '';
        this.file = null;
        this.state = {
            eventObj: {},
            image: '',
            counter: 2,
            photoSizeCheck: false,
            photoMessage: "images must be 640x480"
        }
        this.hours = Array.from(Array(12).keys()).map( (hour, i) => {
            let h = hour + 1;
            return <option value={h} key={i}>{h}</option>
        })
        this.minutes = ["00", "15", "30", "45"].map( (minute, i) => {
            return <option value={minute} key={minute}>{minute}</option>
        })
    }
    
    imgLoadHandler = () => {
            URL.revokeObjectURL(this.file)
            if (this.img.width === 640 && this.img.height === 480) {
                this.setState({
                    photoMessage: "correct size",
                    photoSizeCheck: true
                })
                let str = this.imgValue;
                document.getElementById('loader-label').innerHTML = str.substring(str.lastIndexOf(`\\`) + 1);
            } else {
                this.setState({
                    photoMessage: "wrong size -- must be 640x480",
                    photoSizeCheck: false
                })
                document.getElementById('event_image').value = null;
                document.getElementById('loader-label').innerHTML = "upload a new image";
            }
    }


    onSubmitHandler = async (e) => {

        e.preventDefault();

        let form = e.target;

        if (!this.state.photoSizeCheck) return;


        this.setState({counter: 0})
        const obj = {
            eventname: form.eventname.value,
            date_of_event: form.event_date.value,
            description: form.event_description.value
        };

        const fileNames = EventServices.createFileNames(form.eventname.value, 'event_image');
        obj.img_url = fileNames.img_url;

        obj.time_start = `${form.hour_start.value}:${form.minutes_start.value} ${form.am_pm_start.value}`
        obj.time_end = `${form.hour_end.value}:${form.minutes_end.value} ${form.am_pm_end.value}`
       

       let res =  await EventServices.postNewEvent(obj)
       
       if (res) {
            this.setState({
                counter: this.state.counter + 1
            })
            //get the id from the backend
            obj.id = res.event;
            let res2 = await UploadService.initUpload('event_image', fileNames.imageName)
            if(res2) {
                this.setState({
                    photoMessage: "images must be 640x480",
                    photoSizeCheck: false,
                    counter: 2
                })
                form.reset();
            }
        }


        
    }

    onChangeHandler = (e) => {
        const {name} = e.currentTarget;
        let obj = {};
        if (name === 'title') {
            obj = { title: e.currentTarget.value };
        } else if (name === 'event_date') {
            obj = { date: e.currentTarget.value };
        } else if (name === 'event_description') {
            obj = {  description: e.currentTarget.value };
        } else if (name === 'event_image') {

            const { files } = document.getElementById('event_image');
            this.file = files[0];
            var url = URL.createObjectURL(this.file);
            this.img.src = url;
            this.imgValue = e.currentTarget.value;
            
            obj = { image: e.currentTarget.value };
        } else {
            obj[name] = e.targetValue;
        }
        let newObj = Object.assign({}, this.state.eventObj, obj)
        this.setState({eventObj: newObj});
    }

    render() {
        let spinnerClass = (this.state.counter === 2) ? 'hide' : 'show';
        let photoMessageClass = (this.state.photoSizeCheck)? 'photo-message-success' : 'photo-message-error';
        
        //let minutes = this.minutes.map
        return (
            <div>

                <div className="enter-event" id="event-create">
                    <h4>
                        New Event</h4>
                    <div className={
                        `spinner-parent ${spinnerClass}`
                    }>
                        <Spinners/>
                    </div>
                    <div className="module-body">
                        <form onSubmit={this.onSubmitHandler}>

                            <div>
                                <label>event title:
                                </label>
                                <input placeholder="test title" type="text" name="eventname" onChange={ this.onChangeHandler }/>
                            </div>

                            <div>
                                <label>date:
                                </label>
                                <input type="date" defaultValue={ this.state.date } name="event_date" onChange={ this.onChangeHandler }/>
                            </div>
                            <div>
                                    <label>time start: </label>
                                    <select name="hour_start" onChange={this.onChangeHandler}>{this.hours}</select> : 
                                    <select name="minutes_start" onChange={this.onChangeHandler}>{this.minutes}</select> 
                                    <select name="am_pm_start" onChange={this.onChangeHandler} defaultValue="pm">
                                        <option value="am">am</option>
                                        <option value="pm">pm</option>
                                    </select>

                            </div>
                            <div>
                                    <label>time end: </label>
                                    <select name="hour_end" onChange={this.onChangeHandler}>{this.hours}</select> : 
                                    <select name="minutes_end" onChange={this.onChangeHandler}>{this.minutes}</select> 
                                    <select name="am_pm_end" onChange={this.onChangeHandler} defaultValue="pm">
                                        <option value="am">am</option>
                                        <option value="pm">pm</option>
                                    </select>

                            </div>
                            <div>
                                <label>event description:
                                </label>
                                <textarea placeholder="test desc" as="textarea" name="event_description" rows="3"
                                    onChange={
                                        this.onChangeHandler
                                    }/>
                            </div>
                            <div className="custom-file">
                                <input type="file" className="custom-file-input" name="event_image" id="event_image"
                                    onChange={
                                        this.onChangeHandler
                                    }
                                    accept=".jpg, .png, .gif, .jpeg"/>
                                <label className="custom-file-label" id="loader-label" htmlFor="event_image">upload a new image 640x480
                                </label>
                                <span className={photoMessageClass}>{this.state.photoMessage}</span>
                            </div>
                            <div>
                            <button type="submit">submit</button>
                            </div>
                        </form>

                    </div>
                </div>
            </div>
        );
    }
}
EventCreate.contextType = SiteContext;
