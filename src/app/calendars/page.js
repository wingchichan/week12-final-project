"use client";
import React, { useState } from "react";
import Calendar from "../components/Calendar";
import WeatherWidget from "../components/WeatherWidget";
import "./page.css";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import EventsForm from "../components/EventsForm";

const MyCalendar = () => {
  const { user } = useUser();
  const userName = user?.firstName || "Guest";
  const [showForm, setShowForm] = useState(false);

  return (
    <div>
      <div className="my-calendar-container">
        <h1>Hello, {userName}!</h1>
        <div className="calendar-layout">
          <div className="left-section">
            <div className="add-event-button">
            <Link href="/events">
              <button className="show-form-btn">Add New Event</button>
              </Link>
            </div>
            {showForm && (
              <div className="form-container show-form">
                <EventsForm />
              </div>
            )}
            <div className="weather-widget">
              <WeatherWidget />
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
