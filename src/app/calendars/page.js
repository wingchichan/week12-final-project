import React from "react";
import Calendar from "../components/Calendar";
import WeatherWidget from "../components/WeatherWidget";
import "./page.css";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import { getName } from "@/utilities/actions";

// import NameCalendarForm from '../components/NameCalendarForm'

const MyCalendar = () => {
  // const { user } = useUser();
  // const userName = user?.firstName || "Guest";

  return (
    <div>
      <div className="my-calendar-container">
        <h1>Hello</h1>

        <div className="calendar-layout">
          <div className="left-section">
            <div className="weather-widget">
              <WeatherWidget />
            </div>
            <div className="add-event-button">
              <Link href="/events">
                <button>Add New Event Form</button>
              </Link>
            </div>
          </div>

          <div className="calendar">
            {/* select all from events, needs to have title, start date and end date */}
            <Calendar />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyCalendar;
