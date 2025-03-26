import { db } from "@/utilities/connect";

export default function EventForm() {
  async function handleSubmit(formData) {
    "use server";
    const { title, start } = Object.fromEntries(formData);
    console.log(formData);

    db.query(`INSERT INTO events_test (title, start) VALUES ($1, $2)`, [
      title,
      start,
    ]);
  }

  return (
    <form action={handleSubmit}>
      <input name="title" type="text" placeholder="Enter an event: " />
      <input name="start" type="text" placeholder="Start time" />
      <button type="submit">Submit</button>
    </form>
  );
}
