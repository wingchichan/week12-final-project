import { db } from "@/utilities/connect";

export async function POST(request) {
  const data = await request.json();
  console.log(data);

  await db.query(
    `INSERT INTO calendar_events (calendar_id, activity, location, event_time, price_per_person) VALUES ($1, $2, $3, $4, $5)`,
    [
      data.calendarId,
      data.activity,
      data.location,
      data.event_time,
      data.price_per_person,
    ]
  );

  return Response.json(data);
}
