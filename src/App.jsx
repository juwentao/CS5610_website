import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Selection from './pages/Selection'
import GameEasy from './pages/GameEasy'
import GameNormal from './pages/GameNormal'
import Rules from './pages/Rules'
import HighScores from './pages/HighScores'
import Login from './pages/Login'
import Register from './pages/Register'

function App() {
  return (
    <div className="app">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/games" element={<Selection />} />
        <Route path="/games/easy" element={<GameEasy />} />
        <Route path="/games/normal" element={<GameNormal />} />
        <Route path="/rules" element={<Rules />} />
        <Route path="/scores" element={<HighScores />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
