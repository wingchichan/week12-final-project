import { db } from "@/utilities/connect";
import { redirect } from "next/navigation";
import Link from "next/link";

import { getName } from "@/utilities/actions";

import './page.css';
import { SearchInput } from "../components/SearchInput";


export default async function AllCalendarsPage({ searchParams }) {
  const searchQuery = searchParams?.q || '';
  const calendarData = await db.query(
    `SELECT * FROM calendars WHERE name ILIKE $1`,
    [`%${searchQuery}%`] 
  );
  console.log(calendarData);
  const allCalendars = calendarData.rows;
  console.log(allCalendars);


  const userName = getName();

  return (
    <div>
      <p>{userName}</p>
      {allCalendars.map((calendar) => (
        <div key={calendar.id}>
          <Link href={`/calendars/${calendar.id}`}>{calendar.name}</Link>
        </div>
      ))}
    </div>

    )
  
  return (
    <div className="calendars-container">
      <SearchInput />
      <div>
        {allCalendars.length === 0 ? (
          <p>Oops! No calendars found :(</p> 
        ) : (
          allCalendars.map((calendar) => ( 
            <div key={calendar.id} className="calendar-item">
              <Link href={`/calendars/${calendar.id}`}>{calendar.name}</Link>
            </div>
          ))
        )}
      </div>

    </div>
  );
}
