import { db } from "@/utilities/connect";
import { auth } from "@clerk/nextjs/server";
import MyCalendar from "@/app/components/Calendar";
import { revalidatePath } from "next/cache";

export default async function UserCalendar({ params }) {
  const { id } = await params; //Gets the calendars.id from params.
  const { userId } = await auth();

  const calendarData = await db.query(`SELECT * FROM calendars WHERE id = $1`, [
    id,
  ]);
  const individualCalendar = calendarData.rows[0];

  //Check if the currently signed in user is a part of the group users, selects the clerk id from the user table thats associated with the calender id.
  const members = await db.query(
    `SELECT users.clerk_id
        FROM calendar_members
        JOIN users ON users.id = calendar_members.user_id
        WHERE calendar_members.calendar_id = $1 AND users.clerk_id = $2`,
    [id, userId]
  );

  // Server action to add the currently logged-in user to the calendar_members table if they click th ebutton
  async function handleJoinGroup() {
    "use server";
    const user = await db.query(`SELECT id FROM users WHERE clerk_id = $1`, [
      userId,
    ]);
    //if there is a user
    if (user.rows.length > 0) {
      const userID = user.rows[0].id; //userID is now th id of the current user
      await db.query(
        `INSERT INTO calendar_members (calendar_id, user_id) VALUES ($1, $2)`,
        [id, userID]
      );
    }
    revalidatePath(`/calendars/${id}`);
  }

  // If the user is not a member, show the join form
  if (members.rows.length === 0) {
    return (
      <div>
        <p>You are not part of this group.</p>
        <form action={handleJoinGroup}>
          <button type="submit">Join Group</button>
        </form>
      </div>
    );
  }

  return (
    <div>
      <p>{individualCalendar.name}</p>
      <MyCalendar />
    </div>
  );
}
