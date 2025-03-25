import React from 'react';
import Calendar from '../components/Calendar';
import WeatherWidget from "../components/WeatherWidget";
import './page.css';
// import NameCalendarForm from '../components/NameCalendarForm'

const MyCalendar = () => {
  return (
    <>
      <div className="my-calendar-container">
        <h1>My Calendar</h1>
        <div className="weather-widget">
          <WeatherWidget />
        </div>
        <div className="calendar">
          <Calendar />
        </div>
      </div>
    </>
  );
};

export default MyCalendar;