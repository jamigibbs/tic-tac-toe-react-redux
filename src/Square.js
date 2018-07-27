import React, { Component } from 'react'

class Square extends Component {
  render() {
    const { value, handleClick } = this.props
    return (
      <div className='square' onClick={() => handleClick()}>
        <p>{value}</p>
      </div>
    )
  }
}

export default Square
