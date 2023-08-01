import { useState } from "react";
import PropTypes from "prop-types";
import './MonthYearPicker.css'

const MonthYearPicker = ({selectedMonth,selectedYear,onSelect}) => {
    const [monthInput, setMonthInput] = useState(selectedMonth);
  const [yearInput, setYearInput] = useState(selectedYear);

  const handleMonthChange = (event) => {
    setMonthInput(parseInt(event.target.value));
  };

  const handleYearChange = (event) => {
    setYearInput(parseInt(event.target.value));
  };

  const handleSelect = () => {
    onSelect({ month: monthInput, year: yearInput });
  };
    
        
    return (
        <div className="monthyear">
            <select name="month" id="month" placeholder="Select Month" onChange={handleMonthChange}>
            <option selected value="">Select Month</option>
                <option value="0">January</option>
                <option value="1">Febuary</option>
                <option value="2">March</option>
                <option value="3">April</option>
                <option value="4">May</option>
                <option value="5">June</option>
                <option value="6">July</option>
                <option value="7">August</option>
                <option value="8">September</option>
                <option value="9">October</option>
                <option value="10">November</option>
                <option  value="11">December</option>
            </select>
            <input id="year" type="number" onChange= {handleYearChange} min ={1900} maxLength={4} placeholder="Select Year"  />
            <button id="go" onClick={handleSelect} >Go</button>
        </div>
    )
}
MonthYearPicker.propTypes = {
    selectedMonth: PropTypes.number.isRequired,
    selectedYear: PropTypes.number.isRequired,
    onSelect: PropTypes.func.isRequired,
    };
export default MonthYearPicker;