// EventsForDate.js
import PropTypes from 'prop-types';
import './EventsForDate.css'

const EventsForDate = ({ date,currentUser,onClose }) => {
  // Retrieve events from local storage for the given date
  
  const eventsForDate = JSON.parse(localStorage.getItem(date)) || [] ;

  const userEvents = eventsForDate.filter((event) => event.User == currentUser);

  return (
    <div className="events-for-date">
      <h2>Events for {date.toDateString()}</h2>
      {userEvents.length === 0 ? (
        <p>No events found for this date.</p>
      ) : (
        <div >
          {userEvents.map((event, index) => (
            <div className="event" key={index}>
              <strong>{event.EventName}</strong>: {event.EventDescription}
              <br></br>
              Time: {event.Time}
              <br></br>
              <button id="Delete">Delete</button>
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