
"use client";
import React, { useState } from "react";

import React from "react";

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

import { auth } from "@clerk/nextjs/server";
import { db } from "@/utilities/connect";

const MyCalendar = async () => {
  const { userId } = await auth();
  const userInfo = await db.query(`SELECT * FROM users WHERE clerk_id = $1`, [
    userId,
  ]);
  const userName = userInfo.rows[0].name;

  //db.query get events info based on user id, pass an event list to the calendar
  //ask chatGPT, give it info from databse, ask it how to format it to fit the props of the calendar component


  return (
    <div>
      <div className="my-calendar-container">

        <h1>Hello, {userName}!</h1>

        <h1>Hello {userName}</h1>


        <div className="calendar-layout">
          <div className="left-section">
            <div className="add-event-button">

            <Link href="/events">
              <button className="show-form-btn">Add New Event</button>

              <Link href="/events">
                <button>Add New Event Form</button>

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
            {/* select all from events, needs to have title, start date and end date */}
            <Calendar />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyCalendar;
