import { db } from "@/utilities/connect";
import { redirect } from "next/navigation";
import Link from "next/link";
import { getName } from "@/utilities/actions";

export default async function AllCalendarsPage() {
  const calendarData = await db.query(`SELECT * FROM calendars`);
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
  );
}
