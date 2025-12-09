# ZenGrid Sudoku

A full-stack Sudoku web application with user authentication, game management, and high score tracking.

## Features

- **User Authentication**: Register, login, and logout with secure password hashing
- **Game Management**: Create, play, and track Sudoku games (Easy 6x6 and Normal 9x9)
- **High Scores**: Track completion times and compete on the leaderboard
- **Unique Game Names**: Each game gets a unique 3-word name from 1000+ word combinations
- **RESTful API**: Full CRUD operations for games with proper HTTP verbs

## Tech Stack

### Frontend
- React 18
- React Router DOM
- Vite

### Backend
- Node.js / Express
- MongoDB / Mongoose
- JWT Authentication
- bcryptjs for password hashing

## Getting Started

### Prerequisites
- Node.js 18+
- MongoDB (local or MongoDB Atlas)

### Installation

1. Clone the repository
```bash
git clone https://github.com/juwentao/CS5610_website.git
cd CS5610_website
```

2. Install dependencies
```bash
npm install
```

3. Configure environment variables
Create a `.env` file in the `server` directory (or copy from `.env.example`):
```env
MONGODB_URI=mongodb://localhost:27017/sudoku_game
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
PORT=5000
CLIENT_URL=http://localhost:5173
```

4. Start MongoDB (if running locally)
```bash
mongod
```

5. Run the application

**Development mode (run both frontend and backend):**
```bash
npm run dev:all
```

**Or run separately:**
```bash
# Terminal 1 - Backend
npm run dev:server

# Terminal 2 - Frontend
npm run dev
```

6. Open your browser and navigate to `http://localhost:5173`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user
- `POST /api/auth/logout` - Logout user

### Sudoku Games
- `GET /api/sudoku` - Get all games
- `POST /api/sudoku` - Create new game (body: `{ difficulty: "EASY" | "NORMAL" }`)
- `GET /api/sudoku/:id` - Get game by ID
- `PUT /api/sudoku/:id` - Update game
- `DELETE /api/sudoku/:id` - Delete game

### High Scores
- `GET /api/highscore` - Get all high scores (query: `?difficulty=EASY|NORMAL&limit=50`)
- `POST /api/highscore` - Create high score (body: `{ gameId, time }`)
- `GET /api/highscore/:gameId` - Get high scores for specific game

## Project Structure

```
CS5610_website/
├── server/                 # Backend server
│   ├── config/            # Database and word list config
│   ├── middleware/        # Auth middleware
│   ├── models/            # Mongoose models (User, Game, HighScore)
│   ├── routes/            # API routes
│   ├── utils/             # Sudoku generator
│   └── index.js           # Express server entry point
├── src/                   # Frontend React app
│   ├── components/        # Reusable components
│   ├── context/           # React contexts (Auth, Game)
│   ├── pages/             # Page components
│   ├── services/          # API service functions
│   └── styles/            # CSS styles
├── package.json
└── vite.config.js
```

## Database Collections

### Users
- username, email, password (hashed), createdAt

### Games
- name (unique 3-word), difficulty, board, initialBoard, solution
- createdBy, creatorUsername, isCompleted, completionTime, createdAt

### HighScores
- gameId, gameName, userId, username, time, difficulty, completedAt

## Game Rules

Sudoku is a logic puzzle where:
- Every row must contain numbers 1-X exactly once
- Every column must contain numbers 1-X exactly once
- Every sub-grid must contain numbers 1-X exactly once

Where X = 6 for Easy mode and X = 9 for Normal mode.

## Project links

- Live site (Render): `https://cs5610-website.onrender.com`
