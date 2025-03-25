import { db } from "@/utilities/connect";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function AllCalendarsPage() {
  const calendarData = await db.query(`SELECT * FROM calendars`);
  console.log(calendarData);
  const allCalendars = calendarData.rows;
  console.log(allCalendars);

  return (
    <div>
      {allCalendars.map((calendar) => (
        <div key={calendar.id}>
          <Link href={`/calendars/${calendar.id}`}>{calendar.name}</Link>
        </div>
      ))}
    </div>
  );
}
