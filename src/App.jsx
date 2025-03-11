import { useState } from 'react'
import Chessboard from './components/Chessboard'
import './App.css'

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>Chess Game</h1>
      </header>
      <main className="app-main">
        <Chessboard />
      </main>
      <footer className="app-footer">
        <p>Made with ♟️</p>
      </footer>
    </div>
  )
}

export default App
