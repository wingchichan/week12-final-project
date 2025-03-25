import {auth} from "@clerk/nextjs/server"
import {db} from "@/utilities/connect"
import { redirect } from "next/navigation"

export default async function NameCalendarForm() {
    const {userId} = await auth()
    
    async function  handleSubmit(formData) {
        "use server" //need this at the top of my function
        
        //Get username and bio from the form, and i already have the clerkId
        const {calendarName} = Object.fromEntries(formData) //turns formdata ino a normal object, with name: userinput as props

        //Find userID using clerkID
        const usersID = await db.query (`SELECT id FROM users WHERE clerk_id = $1`,[userId])
        const usersId = usersID.rows[0]?.id;


        //Put into the users databse, the username and bio from the form as destructured variables, and the userId from clerk.
        await db.query(`INSERT INTO calendars (name, created_by) VALUES ($1, $2)`,[calendarName,usersId])

        redirect('/calendars')
    }

    return (
        <form action = {handleSubmit}>
            <input name="calendarName" placeholder="Enter a name for your calendar: " />
            <button type = "submit">Submit</button>
        </form>
    )

}