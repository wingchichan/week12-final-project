import { db } from "@/utilities/connect";

export async function POST(request) {
  const data = await request.json();
  console.log(data.createdBy);

  await db.query(
    `INSERT INTO calendar_events (calendar_id, activity, location, event_time, price_per_person, created_by) VALUES ($1, $2, $3, $4, $5, $6)`,
    [
      data.calendarId,
      data.activity,
      data.location,
      data.event_time,
      data.price_per_person,
      data.userID,
    ]
  );

  return Response.json(data);
}
