import React, {useState} from 'react'
import {decode} from 'html-entities'

export default function Question(props) {
  const { 
          question, 
          correctAnswer, 
          shuffledAnswers, 
          selectedAnswer, 
          updateAnswer, 
          showResult
         } = props
  
  function chooseAnswer(answer, currentQuestion) {
      updateAnswer(answer, currentQuestion)
  }
  
  const answersElements = shuffledAnswers.map((answer, index) => 
  (<button 
     key={index} 
     onClick={() => chooseAnswer(answer, question)}
     className={`answer-btn ${answer === selectedAnswer ? "selected" : ""}
                 ${showResult && answer === correctAnswer ? "correct" : ""}
                 ${showResult && answer === selectedAnswer && answer !== correctAnswer ? 
                   "incorrect" : ""}
                 ${showResult && answer !== correctAnswer ? "dimmed" : ""}`}
     disabled={showResult}            
   >
    {decode(answer)}
   </button>))
  
  return (
      <div className="question-container">
         <p className='question'>{decode(question)}</p>
         <div className="answers-container">
           {answersElements}
         </div>
      </div>
  )
}