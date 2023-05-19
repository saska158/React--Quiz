import React, {useState} from "react"
import './App.css'
import Start from "./components/Start"
import Questions from "./components/Questions"


function App() {
  const [hasStarted, setHasStarted] = useState(false)

  function startQuiz() {
      setHasStarted(true)
  }

 return (
   <>
    
    {!hasStarted ? <Start handleStart={startQuiz}/> :
    <Questions />}
   </>
 )
}

export default App