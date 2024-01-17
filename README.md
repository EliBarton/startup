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
