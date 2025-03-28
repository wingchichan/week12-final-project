
import { db } from "@/utilities/connect";
import { auth } from "@clerk/nextjs/server";
import MyCalendar from "@/app/components/Calendar";
import { revalidatePath } from "next/cache";
import "./page.css"

export default async function UserCalendar({ params }) {
    const { id } = await params; // Get the calendar ID from params
    const { userId } = await auth();

    // Fetch the calendar details
    const calendarData = await db.query(`SELECT * FROM calendars WHERE id = $1`, [id]);
    if (calendarData.rows.length === 0) {
        return <p>Calendar not found.</p>;
    }

    const individualCalendar = calendarData.rows[0];

    // Check if the user is a member of this calendar
    const members = await db.query(
        `SELECT users.clerk_id
         FROM calendar_members
         JOIN users ON users.id = calendar_members.user_id
         WHERE calendar_members.calendar_id = $1 AND users.clerk_id = $2`,
        [id, userId]
    );

    // Fetch events associated with this calendar
    const eventsData = await db.query(
        `SELECT activity, event_time, location, price_per_person 
         FROM calendar_events 
         WHERE calendar_id = $1`,
        [id]
    );

    // Format the events for react-big-calendar
    const formattedEvents = eventsData.rows.map((event) => ({
        title: event.activity,
        start: new Date(event.event_time),
        end: new Date(event.event_time), // Adjust end time if needed
        location: event.location,
        price_per_person: event.price_per_person ? Number(event.price_per_person) : 0, // Ensure it's a number
    }));

    // Server action to add the currently logged-in user to the calendar
    async function handleJoinGroup() {
        "use server";
        const user = await db.query(`SELECT id FROM users WHERE clerk_id = $1`, [userId]);

        if (user.rows.length > 0) {
            const userID = user.rows[0].id;
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
            <h2>{individualCalendar.name}</h2>
            <MyCalendar eventList={formattedEvents} />

            <h3>Event Details</h3>
            <ul>
                {formattedEvents.length > 0 ? (
                    formattedEvents.map((event, index) => (
                        <li key={index}>
                            <strong>{event.title}</strong>
                            <br />
                            Location: {event.location} <br />
                            Price Per Person: £{event.price_per_person.toFixed(2)}
                            <br />
                            🗓 Date: {event.start.toLocaleString()}
                            <hr />
                        </li>
                    ))
                ) : (
                    <p>No events scheduled.</p>
                )}
            </ul>
        </div>
    );
}
