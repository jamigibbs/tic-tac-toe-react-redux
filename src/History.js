import React, { Component } from 'react'
import { connect } from 'react-redux'

class History extends Component {
  render() {
    const { history } = this.props
    return (
      <div>
        { history.map((win, i) => {
          return (<li key={i}>Players: {win.player} - Moves: {win.moves}</li>)
        })}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    history: state.main.history
  }
}

export default connect(mapStateToProps)(History)
