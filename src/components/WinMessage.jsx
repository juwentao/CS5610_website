function WinMessage({ timer }) {
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins} minute${mins !== 1 ? 's' : ''} and ${secs} second${secs !== 1 ? 's' : ''}`
  }
  
  return (
    <div className="win-message">
      <div className="win-message__content">
        <h2>🎉 Congratulations!</h2>
        <p>You solved the puzzle in {formatTime(timer)}!</p>
        <p>The board is now locked. Start a new game to play again.</p>
      </div>
    </div>
  )
}

export default WinMessage
