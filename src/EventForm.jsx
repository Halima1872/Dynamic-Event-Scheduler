// EventForm.js

import { useState } from 'react';
import PropTypes from 'prop-types';
import Storage from './Storage';

const EventForm = ({ date, onClose }) => {
  const[items, setItems] = useState([])

  const handleSubmit = (e) => {
    e.preventDefault();
    const dateEvent = Storage.getItems(date);
    const newItem = {
        User: Storage.getItem('CurrentUser'),
        EventName: e.target[0].value,
        EventDescription: e.target[1].value,
        Time: e.target[2].value,
      };
      setItems([...items, newItem]);
      if (dateEvent.length === 0) {
        Storage.setItems(date, [...items, newItem]);
    }else {
        Storage.setItems(date, [...dateEvent, ...items,newItem]);
    }

    onClose();
    alert("Event Added Succesfully!")
  };

  return (
    <div className="event-form">
      
      <form onSubmit={handleSubmit}>
      <h2>Add Event</h2>
      <div>
        <label className="form-element" htmlFor="title">Event Title:</label>
        <input className="form-element" type="text" id="title" name="title" required
         />
        </div>
        <div>
        <label className="form-element" htmlFor="description">Event Description:</label>
        <input className="form-element" type="text" id="description" name="description" required
        />
        </div>
        <div>
        <label className="form-element" htmlFor="time">Time:</label>
        <input className="form-element" type="time" id="time" name="time" required
        />
        </div>
        
        <div>
          <button className="form-element" type="submit">Add Event</button>
          <button className="form-element" type="button" onClick={onClose}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};
EventForm.propTypes = {
    date: PropTypes.instanceOf(Date).isRequired,
    onClose: PropTypes.func.isRequired,
  };
export default EventForm;
