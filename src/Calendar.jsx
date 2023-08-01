import PropTypes from 'prop-types';
import Storage from './Storage';
const Calendar = ({ selectedDate, currentYear, currentMonth, handleDateClick }) => {
    const hasEventsForDate = (date) => {
        const eventsForDate = Storage.getItems(date);
        const currentUser = Storage.getItem('CurrentUser')
        const userEvents = eventsForDate.filter((event) => event.User == currentUser);
        return userEvents.length > 0;
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



    return (
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
    )
}
Calendar.propTypes = {
    selectedDate: PropTypes.instanceOf(Date).isRequired,
    currentYear: PropTypes.number.isRequired,
    currentMonth: PropTypes.number.isRequired,
    handleDateClick: PropTypes.func.isRequired,
};
export default Calendar;


