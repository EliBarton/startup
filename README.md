# Startup Project: GalagaOnline


## Elevator Pitch
Do you want to find out if you are the best Galaga player ever? This game is an endless space shooter game similar to Galaga but there is an online score leaderboard. You can compete with your friends to try to get the highest score. The high scores update live and you claim your high schore using your account so that you can clearly see who is winning in a close contest.

## Design
![Welcome Page](WelcomePage.png) 

![Game Page](GamePage.png)

![Score Page](ScorePage.png)

## Key Features
- Secure login over HTTPS
- Infinite Galaga Game
- Ability to Save and Update High Score
- Real-time Update of Leaderboard
- Instructions on How to Play
- High Score is Saved to Account

## Technologies

I will use the required technologies in the following ways.

- **HTML** - Uses correct HTML structure for application. Three HTML pages. One to login, one to play, and one for the leaderboard.
- **CSS** - Application styling and graphic background that looks good on different screen sizes, uses good whitespace, color choice and contrast.
- **JavaScript** - Provides login, the Galaga game, display scores for self and others, backend endpoint calls.
- **Service** - Backend service with endpoints for:
  - login
  - retrieving scores
  - submitting scores
  - retrieving leaderboard
- **DB/Login** - Store users, choices, and scores in database. Register and login users. Credentials securely stored in database. Can't save high score unless authenticated.
- **WebSocket** - As each user gets a new high score, their score is saved so all other users can see it on the leaderboard.
- **React** - Application ported to use the React web framework.

## HTML Deliverable

For this deliverable I built out the structure of my application using HTML.

- **HTML Pages** - 3 HTML pages to represent a welcome, play, and scores page
- **Links** - All pages have a header with links to all the other pages
- **Text** - There's an instructions, scores, and a welcome message displayed
- **Images** - The game is currently represented by an image of galaga
- **DB/Login** - There is a username and password field in the welcome page
- **WebSocket** - The leaderboard will update in real time

## CSS deliverable

For this deliverable I properly styled the application into its final appearance.

- **Header, footer, and main content body**
- **Navigation elements** - I made 3 buttons to navigate to different pages
- **Responsive to window resizing** - My app looks great on all window sizes and devices, even my phone!
- **Application elements** - Used good contrast and whitespace that is gray
- **Application text content** - Consistent fonts and good font sizing
- **Application images** - Image placeholder for the galaga game still looks great!
