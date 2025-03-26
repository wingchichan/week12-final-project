import { auth } from "@clerk/nextjs/server";
import { db } from "@/utilities/connect";
import { redirect } from "next/navigation";

export default async function UserCalendar({ params }) {
    const { id } = params; // Gets the calendars.id from params.

    const calendarData = await db.query(`SELECT * FROM calendars WHERE id = $1`, [id]);
    const individualCalendar = calendarData.rows[0];

    return <p>{individualCalendar.name}</p>;
}
