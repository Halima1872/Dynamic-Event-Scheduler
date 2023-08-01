import './Welcome.css'
import { useState } from "react";
import EventForm from './EventForm';
import ConfirmationDialogue from './ConfirmationDialogue';
import EventsForDate from './EventsForDate'
import Calendar from './Calendar'
import Storage from './Storage';
import Navbar from './Navbar';
import MonthYearPicker from './MonthYearPicker';

export default function Welcome() {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [showEventForm, setShowEventForm] = useState(false);
    const [showConfirmationDialogue, setShowConfirmationDialogue] = useState(false);
    const [showEventsForDate, setShowEventsForDate] = useState(false);
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

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
    const handleMonthYearChange = ({ month, year }) => {
        setSelectedMonth(month);
        setSelectedYear(year);
        // Update the selectedDate to the first day of the selected month
        setSelectedDate(new Date(year, month, 1));
      };

    const currentUser = Storage.getItem('CurrentUser')

    return (
        <>
        <Navbar sticky="top" />
        <div className="calendar-container">
            
            <div className="calendar">

                <div className="header">
                    <h1>Welcome, {currentUser}</h1>
                    <MonthYearPicker selectedMonth={selectedMonth}
                    selectedYear={selectedYear}
                    onSelect={handleMonthYearChange} />
                    
                    <h2>
                        <button
                            id="lt" onClick={() =>
                                {selectedMonth==0?
                                    handleMonthYearChange({month: 11, year: selectedYear-1})
                                    :handleMonthYearChange({month: selectedMonth - 1, year: selectedYear})}  
                            }>
                            &lt;
                        </button>

                        {new Date(selectedYear, selectedMonth).toLocaleString("default", {
                            month: "long"
                        })}{" "}
                        {selectedYear}

                        <button
                            id="gt" onClick={() =>
                                {selectedMonth==11?
                                    handleMonthYearChange({month: 0, year: selectedYear+1})
                                    :handleMonthYearChange({month: selectedMonth + 1, year: selectedYear})}
                            }>
                            &gt;
                        </button>
                    </h2>
                </div>
                <Calendar selectedDate={selectedDate} currentYear={selectedYear} currentMonth={selectedMonth} handleDateClick={handleDateClick} />

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
                    <EventsForDate date={selectedDate} currentUser={currentUser} onClose={() => setShowEventsForDate(false)} />
                }
            </div>
        </div>
        </>
    );
}