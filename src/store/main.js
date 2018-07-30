const USER_MOVE = 'USER_MOVE'
const GAME_MESSAGE = 'GAME_MESSAGE'
const CHECK_FOR_WINNER = 'CHECK_FOR_WINNER'
const RESET_GAME = 'RESET_GAME'

export const userMove = (pos) => {
  return {
    type: USER_MOVE,
    pos
  }
}

export const gameMessage = (message) => {
  return {
    type: GAME_MESSAGE,
    message
  }
}

export const checkForWinner = (player) => {
  return {
    type: CHECK_FOR_WINNER,
    player
  }
}

export const resetGame = () => {
  return {
    type: RESET_GAME
  }
}

const winnerCheck = (board, player) => {
  const horizontal = [0, 3, 6].map( i => { return [i, i + 1, i + 2] })
  const vertical = [0, 1, 2].map( i => { return [i, i + 3, i + 6] })
  const diagonal = [[0, 4, 8], [2, 4, 6]]

  const allwins = [].concat(horizontal).concat(vertical).concat(diagonal)

  const result = allwins.some(indices => {
    return board[indices[0]] === player && board[indices[1]] === player && board[indices[2]] === player
  })

  return result
}

const defaultState = {
  board: [ null, null, null, null, null, null, null, null, null ],
  turn: '',
  message: '',
  winner: null,
  moves: 0,
  history: []
}

export default function(state = defaultState, action) {
  switch(action.type) {
    case GAME_MESSAGE:
      return {...state, message: action.message}
    case USER_MOVE: {
      let turn = state.turn
      const board = state.board.map((val, i) => {
        turn = state.turn === 'O' || state.turn === '' ? 'X' : 'O'
        if (i === action.pos) val = turn
        return val
      })
      return {...state, board, turn, moves: state.moves + 1}
    }
    case CHECK_FOR_WINNER: {
      const winnerResult = winnerCheck(state.board, action.player)
      const winner = winnerResult ? action.player : null
      const message = winner ? `The winner is ${action.player}` : state.message
      if(winner){
        const history = {player: winner, moves: state.moves}
        return {...state, winner, message, history: [...state.history, history]}
      }
      return {...state, winner, message}
    }
    case RESET_GAME: {
      return { ...defaultState, history: state.history}
    }
    default:
      return state
  }
}
