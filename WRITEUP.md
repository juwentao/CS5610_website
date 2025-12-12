# ZenGrid Sudoku - Project Writeup

## Challenges Faced

1. **Deployment Configuration**: One of the main challenges was deploying the full-stack application to Render. Initially, I created a Static Site instead of a Web Service, which only serves static files and doesn't run the Node.js backend. Understanding the difference and correctly configuring the Build Command (`npm install && npm run build`) and Start Command (`node server/index.js`) was crucial.

2. **MongoDB Atlas Setup**: Transitioning from local MongoDB to MongoDB Atlas for cloud deployment required learning about connection strings, network access configuration (allowing 0.0.0.0/0 for Render's dynamic IPs), and handling deprecated Mongoose options.

3. **Vite Build Permission Issues**: On Render's Linux environment, running `vite build` directly caused permission errors. The solution was to use `node ./node_modules/vite/bin/vite.js build` to invoke Vite directly through Node.

4. **Sudoku Generation with Unique Solutions**: Implementing the backtracking algorithm to both generate valid Sudoku puzzles and verify that custom puzzles have exactly one unique solution was algorithmically challenging. The `countSolutions()` function needed to efficiently stop after finding more than one solution.

5. **Authentication State Management**: Ensuring the user authentication state persisted across page refreshes and properly synced between the frontend (React Context + localStorage) and backend (JWT verification) required careful coordination.

## Additional Features (Given More Time)

1. **Difficulty Levels for Custom Games**: Allow users to rate the difficulty of custom games based on solving techniques required.

2. **Multiplayer Mode**: Real-time competitive mode where two players race to solve the same puzzle using WebSockets.

3. **Undo/Redo Functionality**: Allow players to undo and redo moves during gameplay.

4. **User Profiles**: Add profile pages showing statistics like games completed, average solve times, and win streaks.

5. **Puzzle Sharing**: Generate shareable links for specific puzzles so users can challenge friends.

6. **Mobile-Responsive Design**: Improve the touch interface for mobile devices with swipe gestures and larger touch targets.

7. **Dark Mode**: Add a dark theme option for better accessibility.

8. **Notes/Pencil Marks**: Allow players to add small candidate numbers in cells like traditional Sudoku solving.

## Assumptions Made

1. **Browser Compatibility**: Assumed users are using modern browsers that support ES6+ features, Fetch API, and CSS Grid.

2. **Network Connectivity**: Assumed users have stable internet connection for API calls and database operations.

3. **Unique Usernames**: Assumed usernames should be unique across the system for identification purposes.

4. **9x9 Custom Games**: Custom game creation is limited to standard 9x9 Sudoku (not 6x6 Easy mode).

## Time to Complete

This assignment took approximately **18 hours** to complete, broken down as follows:
- Backend API development (Express, MongoDB models, routes)
- Frontend updates (React components, API integration)
- Authentication system (JWT, bcrypt, AuthContext)
- Deployment and debugging (Render, MongoDB Atlas)
- Bonus features (DELETE button, Custom Game creator)

## Bonus Points Accomplished

### ✅ Bonus 1: Password Encryption (Security)
User passwords are encrypted using **bcrypt** with a salt round of 10 before storing in the database.

**Code Location**: [server/models/User.js](server/models/User.js#L32-L40)
```javascript
// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    return next();
  }
  
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});
```

### ✅ Bonus 2: DELETE Button for Game Creators
When a user who created a game views that game page, a red "DELETE" button is displayed. Clicking it shows a confirmation modal warning that all associated high scores will also be deleted.

**Code Locations**:
- Frontend DELETE button: [src/pages/GamePage.jsx](src/pages/GamePage.jsx#L428-L435)
- Delete confirmation modal: [src/pages/GamePage.jsx](src/pages/GamePage.jsx#L363-L390)
- Backend delete route with high score cleanup: [server/routes/sudoku.js](server/routes/sudoku.js#L148-L177)

```javascript
// Delete all high scores associated with this game
const deletedScores = await HighScore.deleteMany({ gameId: req.params.id });
console.log(`Deleted ${deletedScores.deletedCount} high scores for game ${req.params.id}`);

await Game.deleteOne({ _id: req.params.id });
```

### ✅ Bonus 3: Custom Game Creator with Unique Solution Validation
Users can create custom Sudoku puzzles via the `/custom` route. The backend validates that the puzzle:
1. Follows Sudoku rules (no duplicates in rows/columns/boxes)
2. Has at least 11 filled cells
3. Has **exactly one unique solution** (verified using backtracking algorithm)

**Code Locations**:
- Custom game page: [src/pages/CustomGame.jsx](src/pages/CustomGame.jsx)
- "Create Custom Game" button: [src/pages/Selection.jsx](src/pages/Selection.jsx#L67-L71)
- Backend validation endpoint: [server/routes/sudoku.js](server/routes/sudoku.js#L179-L280)
- Solution counting algorithm: [server/utils/sudokuGenerator.js](server/utils/sudokuGenerator.js#L63-L113)

The `countSolutions()` function uses backtracking to count solutions, stopping early if more than one solution is found:
```javascript
export function countSolutions(puzzle, size) {
  // ... backtracking implementation
  function solve() {
    // ... recursive solving
    if (count > 1) return; // Early termination for efficiency
    // ...
  }
  solve();
  return count;
}
```
