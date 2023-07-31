import './Welcome.css'
import { useState } from "react";
import EventForm from './EventForm';
import ConfirmationDialogue from './ConfirmationDialogue';
import EventsForDate from './EventsForDate'

export default function Welcome() {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [showEventForm, setShowEventForm] = useState(false);
    const [showConfirmationDialogue, setShowConfirmationDialogue] = useState(false);
    const [showEventsForDate, setShowEventsForDate] = useState(false);

    const hasEventsForDate = (date) => {
        const eventsForDate = JSON.parse(localStorage.getItem(date)) ;
        const currentUser = localStorage.getItem('CurrentUser')
        if(eventsForDate){
        const userEvents = eventsForDate.filter((event) => event.User == currentUser);
        return userEvents.length > 0;
        }else{
            return false
        }
        
    };

    const getDaysOfWeek = () => {
        return ["S", "M", "T", "W", "Th", "F", "S"];
    }

    const getDaysInMonth = (year, month) => {
        return new Date(year, month + 1, 0).getDate();
    }
    const getFirstDayOfMonth = (year, month) => {
        return new Date(year, month, 1).getDay();
    }
    const isSameDay = (date1, date2) => {
        return (
          date1.getDate() === date2.getDate() &&
          date1.getMonth() === date2.getMonth() &&
          date1.getFullYear() === date2.getFullYear()
        );
      };

    const generateCalendarGrid = (year, month) => {
        const totalDaysInMonth = getDaysInMonth(year, month);
        const firstDayOfMonth = getFirstDayOfMonth(year, month);

        const calendarGrid = [];
        let dayCounter = 1;

        // Generate rows for the calendar
        for (let week = 0; week < 6; week++) {
            const row = [];
            // Generate cells for each day of the week
            for (let day = 0; day < 7; day++) {
                if (
                    (week === 0 && day < firstDayOfMonth) || dayCounter > totalDaysInMonth) {
                    row.push(<td key={`${week}-${day}`}></td>);
                } else {
                    const date = new Date(year, month, dayCounter);
                    const isCurrentMonth = date.getMonth() === month;
                    const classNames = [isCurrentMonth ? 'current-month' : 'other-month'];

                    if (hasEventsForDate(date)) {
                        classNames.push('has-events');
                    }
                    if (isSameDay(selectedDate, date)) {
                        classNames.push('selected');
                      }
                    row.push(
                        <td
                            key={`${week}-${day}`}
                            className={classNames.join(' ')}
                            onClick={() => handleDateClick(date)}
                        >
                            {dayCounter}
                        </td>
                    );
                    dayCounter++;
                }
            }
            calendarGrid.push(<tr key={week}>{row}</tr>);
        }
        return calendarGrid;
    }
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
            <table>
                <thead>
                    <tr>
                        {getDaysOfWeek().map((day) => (
                            <th key={day}>{day}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>{generateCalendarGrid(currentYear, currentMonth)}</tbody>
            </table>

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