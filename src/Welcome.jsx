import './Welcome.css'
import { useState } from "react";
export default function Welcome() {
    const [selectedDate, setSelectedDate] = useState(new Date());

    const getDaysOfWeek = () => {
        return ["S", "M", "T", "W", "Th", "F", "S"];
    }

    const getDaysInMonth = (year, month) => {
        return new Date(year, month + 1, 0).getDate();
    }
    const getFirstDayOfMonth = (year, month) => {
        return new Date(year, month, 1).getDay();
    }

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
                    row.push(
                        <td
                            key={`${week}-${day}`}
                            className={isCurrentMonth ? "current-month" : "other-month"}
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
    };

    // Get current month and year
    const currentMonth = selectedDate.getMonth();
    const currentYear = selectedDate.getFullYear();

    return (

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
    );
}