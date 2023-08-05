import React, { useEffect } from 'react';
import './Pomodoro.css';
import './index.css';
import { useState } from 'react';




function App() {

  const [sessionTime,setSessionTime] = useState(60*25);
  const [breakTime,setBreakTime] = useState(5*60);
  const [displayTime,setDisplayTime] = useState(25*60);
  const [timerOn,setTimerOn] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [isSessionStarted, setIsSessionStarted] = useState(false);
  const audio = document.getElementById('beep');


  




  function formatTime(time){
    let minutes = Math.floor(time/60)
    let seconds = time%60;
    return (
        (minutes<10 ? '0' + minutes : minutes) + ":" +
        (seconds<10 ? '0' + seconds : seconds)
      );
  }

  function handleClick(amount,type){
    if(type=="session")
      setSessionTime(prev => {
        const newTime = prev + amount;
        if(newTime<1 || newTime>60*60)
          return prev
        setDisplayTime(newTime);
        return newTime;
      })
    else{
      setBreakTime(prev => {
        const newTime = prev + amount;
        if(newTime<1 || newTime>60*60)
          return prev
        return newTime;
      })
    }

  }
 
function startTimer(){
  setIsSessionStarted(!isSessionStarted)
  setTimerOn(!timerOn);
}



useEffect(() => {
  let intervalId;
  if (timerOn) {
    intervalId = setInterval(() => {
      setDisplayTime(prev => prev - 1);
    }, 1000);
  }
  if (displayTime === 0) {
    setIsBreak(prev => !prev);
    if (isBreak) {
      setDisplayTime(sessionTime);
    } else {
      setDisplayTime(breakTime);
    }
    audio.play();
  }
  return () => clearInterval(intervalId);
}, [timerOn, displayTime, isBreak]);
  


  function resetTimer(){
    const breakT = 5*60;
    const sessionT = 25*60;
    setTimerOn(false);
    setIsBreak(false);
    setIsSessionStarted(false)
    setBreakTime(breakT);
    setSessionTime(sessionT);
    setDisplayTime(sessionT);
    audio.currentTime = 0;
    audio.pause();
  }


  return (
    <div id='container'>
      <h1>Pomodoro Clock</h1>
      <TimeControls sessionTime={sessionTime} breakTime={breakTime} handleClick={handleClick}/>
      <TimerDisplay isSessionStarted={isSessionStarted} isBreak={isBreak} formatTime={formatTime} displayTime={displayTime}/>
      <div>
        <button className='startControls' onClick={startTimer} id="start_stop" >{timerOn? "stop" : "start"}</button>
        <button className='startControls' onClick={resetTimer} id='reset' >reset</button>
      </div>
      <audio src="https://assets.mixkit.co/active_storage/sfx/861/861-preview.mp3" id="beep"></audio>
    </div>
  );
}

function TimerDisplay({formatTime,displayTime,isBreak,isSessionStarted}){
  
  

  return(
    <div>
    <div id="timer-label">{!isSessionStarted ? isBreak ? "Break" : "Session" : isBreak ? "Break has begun" : "Session has begun"}</div>
    <div id="time-left">{formatTime(displayTime)}</div>
    </div>
  );
}

function TimeControls({handleClick,breakTime,sessionTime}){



  return(
    <>
      <div id="timeControls">
        <div>
        <h4 id="session-label">Session Length</h4>
        <div className='controls'>
          <button id="session-increment" onClick={() => handleClick(+60,"session")}><i className="fa fa-arrow-up"></i></button>
          <h4 id="session-length">{Math.floor(sessionTime/60)}</h4>
          <button id="session-decrement" onClick={() => handleClick(-60,"session")}><i className="fa fa-arrow-down"></i></button>
        </div>
        </div>
        <div>
        <h4 id="break-label">Break Length</h4>
        <div className='controls'>
          <button id="break-increment" onClick={() => handleClick(+60,"break")}><i className="fa fa-arrow-up"></i></button>
          <h4 id="break-length">{Math.floor(breakTime/60)}</h4>
          <button id="break-decrement" onClick={() => handleClick(-60,"break")}><i className="fa fa-arrow-down"></i></button>
        </div>
        </div>
      </div>
    </>
  )
}



// ReactDOM.render(<App/>,document.getElementById("root"));

export default App;
