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

  state = {
    calendarEvents: [ // initial event data
      { title: 'Event Now', start: new Date() },
    ],
  }
  eventClick = (info) => {
    this.props.history.push(`/events/${info.event.id}`)
  }

  componentDidMount() {
    this.getMonthEvents();
  }

  getMonthEvents = async () => {
    let res = await EventsServices.getMonthEvents();
    console.log(res)
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