import React, { Component } from 'react'
import {connect} from 'react-redux'
import './App.css'
import Square from './Square'
import History from './History'
import { userMove, gameMessage, checkForWinner, resetGame } from './store'

class App extends Component {

  componentWillReceiveProps = (prevProps) => {
    const { turn, moves } = this.props
    if(prevProps.board !== this.props.board && moves >= 2){
      const nextTurn = this.nextTurn(turn)
      this.props.checkForWinner(nextTurn)
    }
  }

  handleSquareSelect = (index) => {
    const { board, moves } = this.props
    if(!board[index]){
      this.props.gameMessage('')
      this.props.userMove(index)
    } else {
      this.props.gameMessage('Move already taken!')
    }

    if(moves >= 8){
      this.props.gameMessage('Tie game!')
    }
  }

  nextTurn = (turn) => {
    return turn === '' || turn === 'O' ? 'X' : 'O'
  }

  resetGame = () => {
    this.props.resetGame()
  }

  render() {
    const { board, turn, message, winner } = this.props
    const nextTurn = this.nextTurn(turn)
    return (
      <div className="App">
        <header className="App-header">
        <h3>Current Turn: {nextTurn}</h3>
        {message && <h2>{message}</h2>}
        </header>
        <button onClick={this.resetGame}>Reset</button>
        <History />
        <div id='board' style={winner && {pointerEvents: 'none'}}>
          <div className='board-row'>
            <Square
              handleClick={() => this.handleSquareSelect(0)}
              value={board[0]} />
            <Square
              handleClick={() => this.handleSquareSelect(1)}
              value={board[1]} />
            <Square
              handleClick={() => this.handleSquareSelect(2)}
              value={board[2]} />
          </div>

          <div className='board-row'>
            <Square
              handleClick={() => this.handleSquareSelect(3)}
              value={board[3]} />
            <Square
              handleClick={() => this.handleSquareSelect(4)}
              value={board[4]} />
            <Square
              handleClick={() => this.handleSquareSelect(5)}
              value={board[5]} />
          </div>

          <div className='board-row'>
            <Square
              handleClick={() => this.handleSquareSelect(6)}
              value={board[6]} />
            <Square
              handleClick={() => this.handleSquareSelect(7)}
              value={board[7]} />
            <Square
              handleClick={() => this.handleSquareSelect(8)}
              value={board[8]} />
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    board: state.main.board,
    turn: state.main.turn,
    message: state.main.message,
    winner: state.main.winner,
    moves: state.main.moves
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    userMove: (pos) => {
      dispatch(userMove(pos))
    },
    gameMessage: (message) => {
      dispatch(gameMessage(message))
    },
    checkForWinner: (player) => {
      dispatch(checkForWinner(player))
    },
    resetGame: () => {
      dispatch(resetGame())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
