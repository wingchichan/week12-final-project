import {auth} from "@clerk/nextjs/server"
import {db} from "@/utilities/connect"
import UserForm from '../components/UserForm';

export default async function Page() {
    const { userId, redirectToSignIn } = await auth();
    
    // If there's no userId, redirect to sign-in page
    if (!userId) return redirectToSignIn();

    // Check if user exists in the database
    const userInfo = await db.query(`SELECT * FROM users WHERE clerk_id = $1`, [userId]);
    if (userInfo.rowCount === 0) {
        // If user doesn't exist, render the UserForm component for registration or updating the profile
        return (
            <div className="max-w-5xl mx-auto p-4">
                <UserForm />  {/* Display the user form */}
            </div>
        );
    }
}
