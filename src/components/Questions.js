import React, {useState, useEffect} from 'react'
import Question from "./Question"
import bottomLeftSmall from '../images/bottom-left-small.png'
import topRightSmall from '../images/top-right-small.png'

export default function Questions() {
  const [questions, setQuestions] = useState([])
  const [questionsAndAnswers, setQuestionsAndAnswers] = useState([])
  const [showWarning, setShowWarning] = useState(false)
  const [score, setScore] = useState(0)
  const [showResult, setShowResult] = useState(false)
  
  useEffect(() => {
    if(questions.length === 0) {
     fetch('https://opentdb.com/api.php?amount=10')
     .then(res => res.json())
     .then(data => {
      setQuestions(data.results)
      setQuestionsAndAnswers(
          data.results.map(questionObj => {
              return {
                  question: questionObj.question,
                  correctAnswer: questionObj.correct_answer,
                  shuffledAnswers: shuffle(questionObj.incorrect_answers, questionObj.correct_answer),
                  selectedAnswer: ""
              }
          })
      )
     })
    }  
   }, [questions])
    
   function shuffle(array, item) {
       const randomIndex = Math.floor(Math.random() * array.length)
       array.splice(randomIndex, 0, item)
       return array 
   }
   
   function updateAnswer(answer, currentQuestion) {
       setQuestionsAndAnswers(
           questionsAndAnswers.map(questionObj => {
             return questionObj.question === currentQuestion ? {...questionObj, selectedAnswer: answer} : questionObj
           })
       )
   } 
   
   function checkAnswers() {
       const notAllAnswered = questionsAndAnswers.some(questionObj => (
           questionObj.selectedAnswer === ""
       ))
       setShowWarning(notAllAnswered)
       if(!notAllAnswered) {
           questionsAndAnswers.forEach(questionObj => {
               if(questionObj.selectedAnswer === questionObj.correctAnswer) {
                   setScore(prevScore => prevScore +1)
               }
           })

          setShowResult(true)
       }
   }
  
   function playAgain() {
    setQuestions([])
    setQuestionsAndAnswers([])
    setShowResult(false)
    setScore(0)
}

  
  const questionsAndAnswersElements = questionsAndAnswers.map((obj, index) => (
      <Question
          key={index}
          id={index}
          question={obj.question}
          correctAnswer={obj.correctAnswer}
          shuffledAnswers={obj.shuffledAnswers}
          selectedAnswer={obj.selectedAnswer}
          updateAnswer={updateAnswer}
          showResult={showResult}
       />
  ))
 
  return (
      <div className='container'>
        <img className='bottom-left-img' src={bottomLeftSmall} />
        <img className='top-right-img' src={topRightSmall} />
        <div className="questions-container">
          {questionsAndAnswersElements}
          {showWarning && <p className='warning'>There are questions not answered yet</p>}
          {questions.length > 0 && !showResult ? <button className='check-btn' onClick={checkAnswers}>Check answers</button> : null}
          {showResult && (
            <div className='score-play'>
             <p className='score'>You scored {score}/10 correct answers</p>
             <button className='play-btn' onClick={playAgain}>Play again</button>
            </div> 
          )}
        </div>  
      </div>
  )
}