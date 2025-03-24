import React from 'react';
import Calendar from '../components/Calendar';
import WeatherWidget from "../components/WeatherWidget";


const MyCalendar = () => {
  return (
    <div>
        
      <h1>My Calendar</h1>
      <WeatherWidget />
      <Calendar />

    </div>
  );
};

export default MyCalendar;