import { auth } from "@clerk/nextjs/server";
import { db } from "@/utilities/connect";
import React from "react";
import Calendar from "../components/Calendar";
import WeatherWidget from "../components/WeatherWidget";
import "./page.css";
import Link from "next/link";

const MyCalendar = async () => {
  const { userId } = await auth();
  const userInfo = await db.query(`SELECT * FROM users WHERE clerk_id = $1`, [
    userId,
  ]);

  if (userInfo.rows.length === 0) return <p>User not found.</p>;

  const userID = userInfo.rows[0].id;
  const userName = userInfo.rows[0].name;

  // Get user's calendar ID
  const calendarJoin = await db.query(
    `SELECT id FROM calendars WHERE created_by = $1`,
    [userID]
  );

  if (calendarJoin.rows.length === 0) {
    return <p>You do not have a calendar yet.</p>;
  }

  const calendarID = calendarJoin.rows[0].id;

  // Get events for this calendar
  const eventsData = await db.query(
    `SELECT activity, event_time FROM calendar_events WHERE calendar_id = $1`,
    [calendarID]
  );

  // Format events for react-big-calendar
  const formattedEvents = eventsData.rows.map((event) => ({
    title: event.activity,
    start: new Date(event.event_time),
    end: new Date(event.event_time), // Adjust end time if needed
  }));

  return (
    <div>
      <div className="my-calendar-container">
        <h1>Hello {userName}</h1>

        <div className="calendar-layout">
          <div className="left-section">
            <div className="weather-widget">
              <WeatherWidget />
            </div>
            <div className="add-event-button">
              <Link href="/events">
                <button>Add New Event</button>
              </Link>
            </div>
          </div>

          <div className="calendar">
            <Calendar eventList={formattedEvents} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyCalendar;

