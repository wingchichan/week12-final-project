import { db } from "@/utilities/connect";
import { redirect } from "next/navigation";
import Link from "next/link";
import {auth} from "@clerk/nextjs/server"

export default async function AllCalendarsPage() {
    const {userId} = await auth() //Gets the clerkID from currenlty logged in user
    const userInfo = await db.query(`SELECT * FROM users WHERE clerk_id = $1`, [ //selects the row of the users table where the clerk id matches
        userId,
    ]);
    const userID = userInfo.rows[0].id //Gets the database users.id (not clerk id) from the users table.

    //selects the calednar id and name from the joined table of calendars and calendar members, where the user id for the calendar members = the user id of the currently logged in user.
    const calendarData = await db.query(`
    SELECT calendars.id, calendars.name
    FROM calendars
    JOIN calendar_members ON calendars.id = calendar_members.calendar_id
    WHERE calendar_members.user_id = $1
    `,[userID]);
    
    
    console.log(calendarData);
    const usersCalendars = calendarData.rows;


    return (
        <div>
        {usersCalendars.map((calendar) => (
            <div key={calendar.id}>
            <Link href={`/calendars/${calendar.id}`}>{calendar.name}</Link>
            </div>
        ))}
        </div>
    );
}