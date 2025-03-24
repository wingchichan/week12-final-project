import React from 'react';
import Calendar from '../components/Calendar';
import WeatherWidget from "../components/WeatherWidget";


const Page1 = () => {
  return (
    <div>
        <WeatherWidget />
      <h1>My calendar</h1>
      <Calendar />

    </div>
  );
};

export default Page1;