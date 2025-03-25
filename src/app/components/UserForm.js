import { auth } from "@clerk/nextjs/server";
import { db } from "@/utilities/connect";
import { redirect } from "next/navigation";

export default async function UserForm() {
  //Get userId From clerk by detsructuring
  const { userId } = await auth();

  //server action to update my users table with the users profile info and unqiue clerk identity.
  async function handleSubmit(formData) {
    "use server"; //need this at the top of my function

    //Get username and bio from the form, and i already have the clerkId
    const { username } = Object.fromEntries(formData); //turns formdata ino a normal object, with name: userinput as props

    //Put into the users databse, the username and bio from the form as destructured variables, and the userId from clerk.
    db.query(`INSERT INTO users (name, clerk_id) VALUES ($1, $2)`, [
      username,
      userId,
    ]);

    redirect("/nameCalendarForm");
  }

  return (
    <form action={handleSubmit}>
      <input name="username" placeholder="Enter a username: " />
      <button type="submit">Submit</button>
    </form>
  );
}
