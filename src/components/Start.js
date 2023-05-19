import React from 'react'
import bottomLeftBig from '../images/bottom-left-big.png'
import topRightBig from '../images/top-right-big.png'

export default function Start(props) {
  return (
      <div className='container'>
        <img className='bottom-left-img' src={bottomLeftBig} />
        <img className='top-right-img' src={topRightBig} />
        <h1>Quizzical</h1>
        <button onClick={props.handleStart}>Start quiz</button>
      </div>
  )
}