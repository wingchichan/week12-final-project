import { auth } from "@clerk/nextjs/server";
import { db } from "@/utilities/connect";
import UserForm from "../components/UserForm";
import { redirect } from "next/navigation";
import './page.css';

export default async function Page() {
  const { userId, redirectToSignIn } = await auth();

  // Check if user exists in the database
  const userInfo = await db.query(`SELECT * FROM users WHERE clerk_id = $1`, [
    userId,
  ]);
  console.log(userInfo);
  if (userInfo.rowCount === 0) {
    // If user doesn't exist, render the UserForm component for registration or updating the profile
    return (
      <div className="page-container">
      <div className="form-container">
        <h1>Please enter Username</h1>
        <UserForm /> 
      </div>
    </div>
  );
  } else redirect("/calendars");
  // If there's no userId, redirect to sign-in page
  if (!userId) return redirectToSignIn();
}
