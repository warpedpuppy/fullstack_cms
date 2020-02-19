import TokenService from './token-service';
import config from '../config';

const EventsServices = {
  async postNewEvent(obj) {
    const response = await fetch(`${config.API_ENDPOINT}/events/new-event`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${TokenService.getAuthToken()}`,
      },
      body: JSON.stringify(obj),
    });
    return await response.json();
  },
  async getMonthEvents(eventMonth) {
    console.log('eventMonth = ', eventMonth)
    const response = await fetch(`${config.API_ENDPOINT}/events/current-month-events?month${eventMonth}`, {
      headers: {
        authorization: `Bearer ${TokenService.getAuthToken()}`
      }
    });
    return await response.json();
  },
  async getEventTitles(offset, increment) {
    const response = await fetch(`${config.API_ENDPOINT}/events/titles-for-edit?offset=${offset}&increment=${increment}`, {
      headers: {
        authorization: `Bearer ${TokenService.getAuthToken()}`,
      }
    });
    return await response.json();
  },
  deletePhoto(id, url) {
    const obj = {
      id, url,
    };
    return fetch(`${config.API_ENDPOINT}/events/delete-photo`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${TokenService.getAuthToken()}`,
      },
      body: JSON.stringify(obj),
    });
  },
  createFileNames(eventname, string) {
    const titleWithoutSpaces = eventname.replace(/ /g, '');
    const { files } = document.getElementById(string);
    const imageName = `${titleWithoutSpaces}${files[0].name}`;
  
    const img_url = config.IMAGE_ROOT + imageName;
    return { img_url, imageName };
  },
  async getAllEvents() {
    const result = await fetch(`${config.API_ENDPOINT}/events/events`, {
      headers: {
        'content-type': 'application/json',
      },
    });
    const resultJson = await result.json();
    return resultJson;
  },
  async getAllPhotos() {
    const result = await fetch(`${config.API_ENDPOINT}/events/photos`, {
      headers: {
        authorization: `Bearer ${TokenService.getAuthToken()}`,
      },
    });
    return await result.json();
  },
  async getEventDetails(id) {
    let result = await fetch(`${config.API_ENDPOINT}/events/get-event-details/${id}`, {
      headers: {
        authorization: `Bearer ${TokenService.getAuthToken()}`,
      }
    });
    return await result.json();
  },
  async submitEditedEvent(obj) {
      let res = await fetch(`${config.API_ENDPOINT}/events/event-for-edit`, {
          method: "PUT",
          headers: {
              authorization: `Bearer ${TokenService.getAuthToken()}`,
              'content-type': 'application/json'
          },
          body: JSON.stringify(obj)
      })
      return await res.json();

  },
  async deleteEvent (id) {
       
      let res = await fetch(`${config.API_ENDPOINT}/events/delete-event`, {
          method: "DELETE",
          headers: {
              authorization: `Bearer ${TokenService.getAuthToken()}`,
              'content-type': 'application/json'
          },
          body: JSON.stringify({id})
      })
      return await res.json();
  }

};
export default EventsServices;
