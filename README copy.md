# Movie Puzzler

A full-stack MERN application where users guess famous movies based on cynical and literal descriptions. The game features a difficulty-based scoring system, real-time progress tracking, and a global leaderboard.

---

##  Features

###  Secure Authentication
- **JWT-Powered:** Users can Sign Up and Login securely using JSON Web Tokens.
- **Protected Gameplay:** The game and progress-saving features are inaccessible to guests.
- **Password Hashing:** Passwords are encrypted using `bcryptjs` before being stored in MongoDB.

###  The Game Loop
- **Difficulty Levels:** Choose between **Easy (10pts)**, **Medium (20pts)**, and **Hard (30pts)**.
- **Randomized Puzzles:** Fetches random puzzles from MongoDB.
- **Intelligent Hint System:** A "Need a Hint?" button automatically appears after 3 incorrect attempts.
- **Real-time UI:** The user's score updates instantly in the game header upon a correct guess.

###  Progress Guardrails
- **Duplicate Prevention:** Strict server-side checks ensure points are only awarded the first time a specific puzzle is solved.
- **Data Integrity:** Prevents server crashes and data corruption by ensuring the `puzzlesSolved` array exists before operations.

### Leaderboard
- **Global Rankings:** A clean, minimalist list of all players ranked by their total points.
- **Descending Order:** Users are sorted from highest to lowest score directly via MongoDB queries.

---

## Tech Stack

- **Frontend:** React, Tailwind CSS, React Router, Context API
- **Backend:** Node.js, Express.js
- **Database:** MongoDB, Mongoose
- **Auth:** JWT (JSON Web Tokens), bcryptjs

---

## API Documentation

### Authentication
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/api/auth/register` | Create a new user account |
| `POST` | `/api/auth/login` | Authenticate and receive a JWT |
| `GET` | `/api/auth/me` | Fetch current user's profile and score |

### Puzzles & Gameplay
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/puzzles/:difficulty` | Fetch a random puzzle of a specific level (Protected) |
| `POST` | `/api/puzzles/:id/solve` | Record a solve and update user score (Protected) |
| `GET` | `/api/auth/leaderboard` | Get all users sorted by score (Public) |

---

## Installation & Setup

### 1. Clone the Repository
```bash
git clone <your-repo-url>
cd movie-puzzler
