"use server";
import { db } from "./connect";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export async function handleAddEvent(formData) {
  console.log(formData);
  redirect("/calendars")
  //   const { activity, location, event_time, price_per_person } = formData;
  try {
    // db.query(
    //   `INSERT INTO calendar_events (activity, location, event_time, price_per_person) VALUES ($1, $2, $3, $4)`,
    //   [activity, location, event_time, price_per_person]
    // );
  } catch (error) {
    console.error(error.message);
  }
}
