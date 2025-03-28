PLANNING AND DESIGN:

After agreeing on a calendar app where users can add, view, categorize, and get notified about events, we initialized the project on GitHub. We created wireframes using Figma to map out the app’s layout, including event forms, calendar views, and group pages. Tasks were divided: focusing on backend setup (e.g., Supabase, Clerk), and handling frontend features (React modal, styling). We set up Clerk for our login function and shared environment variables via chat. Research on calendar libraries supported the daily/weekly/monthly view requirement.

Back-End Development:

We configured Clerk login with keys and added a password feature for security. Initial tables were set up in Supabase, including an events table with activity, location, event_time, and price_per_person. We made a users, calendars and calendarMembers tables. The project was deployed on Vercel for testing, and the team updated .env files with force redirect URLs. We created the databse connection pool and we tested queries.

Front-End Development:

We built a semantic frontend base, adding a navigation bar to the profile page and a footer across pages. A working EventsForm component was created within a React modal for adding events, with styling applied to both the form and the My Groups page. Dynamic route pages were set up for event viewing, supported by calendar library research for daily/weekly/monthly formats. Features like a search bar, "Join Calendars" button, and weather API (with a fixed duplicate container bug) were added. We implemented a dark/light theme toggle, styled the UserForm, and ensured responsive design. The calendar name was added to the screen, and an invitation link UI was integrated. Bugs (e.g., nav bar on login page) were resolved, and a presentation was prepared to demo the app.

INSTRUCTIONS:

 When you open up the page you're met with the home screen, which has sign in and sign up options. Once you create an account and login, you make a username and make  and name your calendar. From there you can make events in your calendar and also view join your friends' calendars.

To clone the project run the command in your terminal: git clone https://github.com/wingchichan/week12-final-project

Then install the packages with npm install pg. Download from the following links:

https://www.weatherapi.com/
https://github.com/jquense/react-big-calendar
