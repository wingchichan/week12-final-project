import { db } from "@/utilities/connect";

export default async function UserCalendar({ params }) {
  const { id } = await params; //Gets the calendars.id from params.

  const calendarData = await db.query(`SELECT * FROM calendars WHERE id = $1`, [
    id,
  ]);
  const individualCalendar = calendarData.rows[0];

  return <p>{individualCalendar.name}</p>;
}
