'use client';
import React from 'react';
import Calendar from '../components/Calendar';
import WeatherWidget from "../components/WeatherWidget";
import './page.css';
import Link from 'next/link';
import { useUser } from "@clerk/nextjs";

// import NameCalendarForm from '../components/NameCalendarForm'

const MyCalendar = () => {
  const { user } = useUser();
  const userName = user?.firstName || "Guest";

  return (
    <div>

      <div className="my-calendar-container">
        <h1>Hello, {userName}!</h1>

        <div className="calendar-layout">

          <div className="left-section">
            <div className="weather-widget">
              <WeatherWidget />
            </div>
            <div className="add-event-button">
              <Link href="/add-event">
                <button>Add New Event Form</button>
              </Link>
            </div>
          </div>

          <div className="calendar">
            <Calendar />
          </div>
        </div>
      </div>

      
    </div>
  );
};

export default MyCalendar;
