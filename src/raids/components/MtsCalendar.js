import React, {useState} from 'react';
import Calendar from 'react-calendar'
import "./MtsCalendar.css";


const raidDates = [ {date: "11 Jul"}, {date:"23 Jul"}, {date:"30 Jul"}];
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

