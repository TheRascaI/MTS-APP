import React, {useState} from 'react';
import Calendar from 'react-calendar'
import "./MtsCalendar.css";

const isSameDay = (date1, date2) => {
    if(date1 === date2 ){
        return true;

    }
};

function tileContent({ date, view }) {
// Add class to tiles in month view only
if (view === 'month') {
  // Check if a date React-Calendar wants to check is on the list of dates to add class to
  if (raidDates.find(dDate => isSameDay(dDate, date))) {
    return 'My content';
  }
}
}

const MtsCalendar = () => {

    const [value, onChange] = useState(new Date());
    console.log(value);

  

    return(
        <div id="mts-calendar" className="main-calendar">
     <Calendar
        onChange={onChange}
        value={value}
        tileContent= {tileContent}
      />
        </div>
        
    )
}

export default MtsCalendar;
