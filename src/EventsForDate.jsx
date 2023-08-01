// EventsForDate.js
import Storage from './Storage';
import PropTypes from 'prop-types';
import './EventsForDate.css'
import { useState } from 'react';

const EventsForDate = ({ date, currentUser, onClose }) => {
  // Retrieve events from local storage for the given date
  const [events, setEvents] = useState(() => {
    const storedEvents = Storage.getItems(date) ;
    return storedEvents.filter((event) => event.User == currentUser);
  });

  const handleDeleteEvent = (eventToDelete) => {
    const updatedEvents = events.filter((event) => event !== eventToDelete);
    setEvents(updatedEvents);
    Storage.setItems(date, updatedEvents);
  };

  return (
    <div className="events-for-date">
      <h2>Events for {date.toDateString()}</h2>
      {events.length === 0 ? (
        <p>No events found for this date.</p>
      ) : (
        <div >
          {events.map((event, index) => (
            <div className="event" key={index}>
              <strong>{event.EventName}</strong>: {event.EventDescription}
              <br></br>
              Time: {event.Time}
              <br></br>
              <button id="Delete" onClick={() => handleDeleteEvent(event)}>Delete</button>
            </div>
          ))}

        </div>
      )}
      <button className="form-element" type="button" onClick={onClose}>
        Close
      </button>
    </div>
  );
};
EventsForDate.propTypes = {
  date: PropTypes.instanceOf(Date).isRequired,
  currentUser: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};


export default EventsForDate;