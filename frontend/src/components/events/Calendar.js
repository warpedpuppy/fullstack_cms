import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction'; // needed for dayClick
import { withRouter } from "react-router-dom";
import './Calendar.scss';
import SiteContext from '../../SiteContext';
import EventsServices from '../../services/events-services';

class Calendar extends React.Component {
  calendarComponentRef = React.createRef()
  date = new Date();
  month = this.date.getMonth();
  state = {
    monthCounter: this.month,
    calendarEvents: [ // initial event data
      { title: 'Event Now', start: new Date() },
    ],
  }
  eventClick = (info) => {
    this.props.history.push(`/event/${info.event.id}`)
  }

  componentDidMount() {
    this.getMonthEvents(this.state.monthCounter);
    document.querySelector('.fc-prev-button').addEventListener('click', this.getPrevMonthEvents)
    document.querySelector('.fc-next-button').addEventListener('click', this.getNextMonthEvents)
    document.querySelector('.fc-today-button').addEventListener('click', this.getCurrentMonthEvents)
  }
  getCurrentMonthEvents = () => {
    this.setState({monthCounter: this.date.getMonth()})
    this.getMonthEvents(this.state.monthCounter)
  }
  getNextMonthEvents = () => {
    this.setState({monthCounter: this.state.monthCounter + 1})
    this.getMonthEvents(this.state.monthCounter)
  }
  getPrevMonthEvents = () => {
    this.setState({monthCounter: this.state.monthCounter - 1})
    this.getMonthEvents(this.state.monthCounter)
  }

  getMonthEvents = async (monthCounter) => {

    let res = await EventsServices.getMonthEvents(monthCounter);
   // console.log('get month events results = ', res.events)
    //res.events.forEach( event => console.log(event.date_of_event))
   
    if (res.success) {
      const arr = res.events.map((event) => ({ title: event.eventname, id: event.id, date: event.date_of_event }));
      this.setState({ calendarEvents: arr });
    }
  }

  render() {

    return (
      <div className="demo-app">
        <div className="demo-app-top">
        </div>
        <div className="demo-app-calendar">
          <FullCalendar
            id="calendar"
            defaultView="dayGridMonth"
            header={{
              left: 'prev,next today',
              center: 'title',
              right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek',
            }}
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            ref={this.calendarComponentRef}
            weekends={this.state.calendarWeekends}
            events={this.state.calendarEvents}
            eventClick={this.eventClick}

          />
        </div>
      </div>
    );
  }

}
Calendar.contextType = SiteContext;
export default withRouter(Calendar)