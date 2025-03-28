import { db } from "@/utilities/connect";
import { redirect } from "next/navigation";
import Link from "next/link";
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

 
  return (
    <div className="calendars-container">
      <SearchInput />
      <div className="no-cal-found">
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
