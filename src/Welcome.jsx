import './Welcome.css'
import { useState } from "react";
import EventForm from './EventForm';
import ConfirmationDialogue from './ConfirmationDialogue';
import EventsForDate from './EventsForDate'
import Calendar from './Calendar'

export default function Welcome() {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [showEventForm, setShowEventForm] = useState(false);
    const [showConfirmationDialogue, setShowConfirmationDialogue] = useState(false);
    const [showEventsForDate, setShowEventsForDate] = useState(false);

    
    const handleDateClick = (date) => {
        setSelectedDate(date);

        console.log(date)
        setShowConfirmationDialogue(true);
        setShowEventsForDate(false)
        
    }
    const handleConfirmation = (confirmed) => {
        if (confirmed) {
            setShowEventsForDate(true);
            setShowEventForm(false);
        }
        else {
            setShowEventForm(true);
            setShowEventsForDate(false);
        }
    }

    // Get current month and year
    const currentMonth = selectedDate.getMonth();
    const currentYear = selectedDate.getFullYear();

    return (
        <div className="calendar-container">
        <div className="calendar">

            <div className="header">
                <h1>Welcome, {localStorage.getItem('CurrentUser')}</h1>
                <h2>
                    <button
                        id="lt" onClick={() =>
                            setSelectedDate(new Date(currentYear, currentMonth - 1, 1))
                        }>
                        &lt;
                    </button>

                    {new Date(currentYear, currentMonth).toLocaleString("default", {
                        month: "long"
                    })}{" "}
                    {currentYear}

                    <button
                        id="gt" onClick={() =>
                            setSelectedDate(new Date(currentYear, currentMonth + 1, 1))
                        }>
                        &gt;
                    </button>
                </h2>
            </div>
            <Calendar selectedDate={selectedDate} currentYear={currentYear} currentMonth={currentMonth} handleDateClick={handleDateClick} />

        </div>
        <div className="right-sidebar">
        {showConfirmationDialogue && 
         <ConfirmationDialogue message={`Do you want to View Events or Add a New Event for ${selectedDate.toDateString()}?`}
                onConfirm={() => handleConfirmation(true)}
                onCancel={() => handleConfirmation(false)}
                onClose={() => setShowConfirmationDialogue(false)} />
                }
       

        {showEventForm && 
             
        <EventForm date={selectedDate} onClose={() => setShowEventForm(false)} />
        }

        {showEventsForDate && 
        <EventsForDate date={selectedDate} currentUser={localStorage.getItem('CurrentUser')} onClose={() => setShowEventsForDate(false)} />
       }
        </div>


        </div>
    );
}