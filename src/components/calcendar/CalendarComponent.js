import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

import "./calendarComponent.css";

export default function CalendarComponent() {
  const [dateValue, setDateValue] = useState(new Date());

  console.log(dateValue);

  return (
    <>
      <Calendar
        className='calendarContainer'
        value={dateValue}
        onChange={setDateValue}
      />
    </>
  );
}
