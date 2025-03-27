import { db } from "@/utilities/connect";
import { auth } from "@clerk/nextjs/server";

export async function POST(request) {
  const { userId } = await auth();
  const data = await request.json();

  // Get the user ID from the database
  const userInfo = await db.query(`SELECT id FROM users WHERE clerk_id = $1`, [
    userId,
  ]);

  if (userInfo.rows.length === 0) {
    return Response.json({ error: "User not found" }, { status: 404 });
  }

  const userID = userInfo.rows[0].id;

  await db.query(
    `INSERT INTO calendar_events (calendar_id, activity, location, event_time, price_per_person, created_by) 
     VALUES ($1, $2, $3, $4, $5, $6)`,
    [
      data.calendarId,
      data.activity,
      data.location,
      data.event_time,
      data.price_per_person,
      userID,
    ]
  );

  return Response.json({ success: true });
}
