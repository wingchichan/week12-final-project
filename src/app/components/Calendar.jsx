"use client";

import React from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { enUS } from "date-fns/locale";

const locales = {
  "en-US": enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const MyCalendar = ({ eventList }) => {
  const handleEventClick = (event) => {
    alert(
      `Event: ${event.title}\nLocation: ${event.location}\nPrice Per Person: £${event.price_per_person}`
    );
  };

  return (
    <div style={{ height: "100vh" }}>
      <Calendar
        views={["day", "week", "month", "agenda"]}
        selectable
        localizer={localizer}
        defaultDate={new Date()}
        defaultView="month"
        events={eventList}
        style={{ height: "100%" }}
        onSelectEvent={handleEventClick}
      />
    </div>
  );
};

export default MyCalendar;


