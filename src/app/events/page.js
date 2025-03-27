import EventsForm from "../components/EventsForm";
import "./page.css";
import { handleAddEvent } from "@/utilities/actions";
import { db } from "@/utilities/connect";
import { auth } from "@clerk/nextjs/server";

export default async function EventsPage() {
  const { userId } = await auth();

  const user = await db.query(`SELECT * FROM users WHERE clerk_id = $1`, [
    userId,
  ]);
  const userID = user.rows[0].id;

  const calendarJoin = await db.query(
    `SELECT id FROM calendars WHERE created_by = $1`,
    [userID]
  );
  console.log(calendarJoin);
  const calendarID = calendarJoin.rows[0].id;

  return (
    <EventsForm
      handleAddEvent={handleAddEvent}
      calendarID={calendarID}
      userID={userID}
    />
  );
}
