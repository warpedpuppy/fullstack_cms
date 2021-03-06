import React from 'react';
import './EventCreate.css';
import EventServices from '../../../services/events-services';
import UploadService from '../../../services/uploader-service';
import SiteContext from '../../../SiteContext';
import Spinners from '../../Spinners';
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
            loading: false,
            photoSizeCheck: false,
            photoMessage: "images must be 640x480",
            feedback: ''
        }
        this.timeOutHandler = null;
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
       
        this.setState({loading: true})
        let { eventname, event_date, event_description, event_image } = e.target;
        const obj = {
            eventname: form.eventname.value,
            date_of_event: form.event_date.value,
            description: form.event_description.value
        };

        if (!this.state.photoSizeCheck || !eventname.value || !event_description.value) {
            this.setState({feedback: 'please fill out all fields'})
            this.setState({loading: false})
            return;
        }


        const fileNames = EventServices.createFileNames(form.eventname.value, 'event_image');
        obj.img_url = fileNames.img_url;

        obj.time_start = `${form.hour_start.value}:${form.minutes_start.value} ${form.am_pm_start.value}`
        obj.time_end = `${form.hour_end.value}:${form.minutes_end.value} ${form.am_pm_end.value}`
       
       let res =  await EventServices.postNewEvent(obj)
       
       if (res) {
            obj.id = res.event;
            let res2 = await UploadService.initUpload('event_image', fileNames.imageName)
            if(res2) {
                this.setState({
                    photoMessage: "images must be 640x480",
                    photoSizeCheck: false,
                    loading: false,
                    feedback: 'event entered'
                })
                form.reset();
                clearTimeout(this.timeOutHandler)
                this.timeOutHandler = setTimeout(()=>{this.setState({feedback:''})}, 1000)
            }
        }
    }

    onChangeHandler = (e) => {
        const { files } = document.getElementById('event_image');
        this.file = files[0];
        var url = URL.createObjectURL(this.file);
        this.img.src = url;
        this.imgValue = e.currentTarget.value;
    }

    render() {
        let spinnerClass = (this.state.loading) ? 'show' : 'hide';
        let photoMessageClass = (this.state.photoSizeCheck)? 'photo-message-success' : 'photo-message-error';
        return (
            <div>

                <div className="enter-event" id="event-create">
                    <h4>New Event</h4>
                    <div className={`spinner-parent ${spinnerClass}`}>
                        <Spinners />
                    </div>
                    <div className="module-body">
                        <form onSubmit={this.onSubmitHandler}>

                            <div>
                                <label>event title:
                                </label>
                                <input placeholder="test title" type="text" name="eventname" />
                            </div>

                            <div>
                                <label>date:
                                </label>
                                <input type="date" defaultValue={ this.state.date } name="event_date" />
                            </div>
                            <div>
                                    <label>time start: </label>
                                    <select name="hour_start" >{this.hours}</select> : 
                                    <select name="minutes_start" >{this.minutes}</select> 
                                    <select name="am_pm_start" defaultValue="pm">
                                        <option value="am">am</option>
                                        <option value="pm">pm</option>
                                    </select>

                            </div>
                            <div>
                                    <label>time end: </label>
                                    <select name="hour_end" >{this.hours}</select> : 
                                    <select name="minutes_end" >{this.minutes}</select> 
                                    <select name="am_pm_end" defaultValue="pm">
                                        <option value="am">am</option>
                                        <option value="pm">pm</option>
                                    </select>

                            </div>
                            <div>
                                <label>event description:
                                </label>
                                <textarea placeholder="test desc" as="textarea" name="event_description" rows="3" />
                            </div>
                            <div className="custom-file">
                                <input type="file" className="custom-file-input" name="event_image" id="event_image"
                                    onChange={ this.onChangeHandler }
                                    accept=".jpg, .png, .gif, .jpeg"/>
                                <label className="custom-file-label" id="loader-label" htmlFor="event_image">upload a new image 640x480
                                </label>
                                <span className={photoMessageClass}>{this.state.photoMessage}</span>
                            </div>
                            <div>
                            <button type="submit">submit</button>
                            </div>
                            <div className="feedback">{this.state.feedback}</div>
                        </form>

                    </div>
                </div>
            </div>
        );
    }
}
EventCreate.contextType = SiteContext;
