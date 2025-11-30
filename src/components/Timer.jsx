import { useGame } from '../context/GameContext'

function Timer() {
  const { timer } = useGame()
  
  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600)
    const mins = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }
  
  return (
    <div className="timer">
      <span className="timer__label">Elapsed time</span>
      <span className="timer__value">{formatTime(timer)}</span>
    </div>
  )
}

export default Timer
