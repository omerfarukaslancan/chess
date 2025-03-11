import { useState } from 'react'
import './styles.css'

const Chessboard = () => {
  const [board, setBoard] = useState(initializeBoard())
  const [selectedPiece, setSelectedPiece] = useState(null)
  const [currentPlayer, setCurrentPlayer] = useState('white')

  function initializeBoard() {
    const initialBoard = Array(8).fill(null).map(() => Array(8).fill(null))
    
    // Initialize pawns
    for (let i = 0; i < 8; i++) {
      initialBoard[1][i] = { type: 'pawn', color: 'black' }
      initialBoard[6][i] = { type: 'pawn', color: 'white' }
    }

    // Initialize other pieces
    const backRankPieces = ['rook', 'knight', 'bishop', 'queen', 'king', 'bishop', 'knight', 'rook']
    for (let i = 0; i < 8; i++) {
      initialBoard[0][i] = { type: backRankPieces[i], color: 'black' }
      initialBoard[7][i] = { type: backRankPieces[i], color: 'white' }
    }

    return initialBoard
  }

  const handleSquareClick = (row, col) => {
    const piece = board[row][col]

    if (selectedPiece) {
      // Handle piece movement
      const [selectedRow, selectedCol] = selectedPiece
      const selectedPieceData = board[selectedRow][selectedCol]

      if (isValidMove(selectedRow, selectedCol, row, col)) {
        const newBoard = [...board]
        newBoard[row][col] = selectedPieceData
        newBoard[selectedRow][selectedCol] = null
        setBoard(newBoard)
        setCurrentPlayer(currentPlayer === 'white' ? 'black' : 'white')
      }
      setSelectedPiece(null)
    } else if (piece && piece.color === currentPlayer) {
      setSelectedPiece([row, col])
    }
  }

  const isValidMove = (fromRow, fromCol, toRow, toCol) => {
    const piece = board[fromRow][fromCol]
    if (!piece) return false

    // Basic move validation
    const rowDiff = Math.abs(toRow - fromRow)
    const colDiff = Math.abs(toCol - fromCol)

    switch (piece.type) {
      case 'pawn':
        if (piece.color === 'white') {
          if (fromRow === 6) {
            return toCol === fromCol && (toRow === fromRow - 1 || toRow === fromRow - 2)
          }
          return toCol === fromCol && toRow === fromRow - 1
        } else {
          if (fromRow === 1) {
            return toCol === fromCol && (toRow === fromRow + 1 || toRow === fromRow + 2)
          }
          return toCol === fromCol && toRow === fromRow + 1
        }
      case 'rook':
        return (fromRow === toRow || fromCol === toCol)
      case 'knight':
        return (rowDiff === 2 && colDiff === 1) || (rowDiff === 1 && colDiff === 2)
      case 'bishop':
        return rowDiff === colDiff
      case 'queen':
        return rowDiff === colDiff || fromRow === toRow || fromCol === toCol
      case 'king':
        return rowDiff <= 1 && colDiff <= 1
      default:
        return false
    }
  }

  const getPieceSymbol = (piece) => {
    if (!piece) return null

    const symbols = {
      king: piece.color === 'white' ? '♔' : '♚',
      queen: piece.color === 'white' ? '♕' : '♛',
      rook: piece.color === 'white' ? '♖' : '♜',
      bishop: piece.color === 'white' ? '♗' : '♝',
      knight: piece.color === 'white' ? '♘' : '♞',
      pawn: piece.color === 'white' ? '♙' : '♟'
    }

    return symbols[piece.type]
  }

  const renderCoordinates = () => {
    const files = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']
    const ranks = ['8', '7', '6', '5', '4', '3', '2', '1']
    
    return (
      <>
        {files.map((file, i) => (
          <div key={`file-${file}`} className="coordinate file" style={{ left: `${(i * 12.5) + 6}%` }}>
            {file}
          </div>
        ))}
        {ranks.map((rank, i) => (
          <div key={`rank-${rank}`} className="coordinate rank" style={{ top: `${(i * 12.5) + 6}%` }}>
            {rank}
          </div>
        ))}
      </>
    )
  }

  return (
    <div className="chessboard-container">
      <div className="chessboard">
        {renderCoordinates()}
        {board.map((row, rowIndex) => (
          row.map((piece, colIndex) => {
            const isSelected = selectedPiece && 
              selectedPiece[0] === rowIndex && 
              selectedPiece[1] === colIndex

            return (
              <div
                key={`${rowIndex}-${colIndex}`}
                className={`square ${(rowIndex + colIndex) % 2 === 0 ? 'light' : 'dark'} 
                  ${isSelected ? 'selected' : ''}`}
                onClick={() => handleSquareClick(rowIndex, colIndex)}
              >
                {getPieceSymbol(piece)}
              </div>
            )
          })
        ))}
      </div>
      <div className="game-status">
        Current Turn: {currentPlayer}
      </div>
    </div>
  )
}

export default Chessboard