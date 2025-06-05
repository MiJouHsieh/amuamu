import { createContext, useContext, useState, useEffect } from "react";

const TimerContext = createContext();

export function TimerProvider({ children }) {
  const [isTimerOn, setIsTimerOn] = useState(false)
  const [elapsedTime, setElapsedTime] = useState(0)
  const [startTime, setStartTime] = useState(null);
  const [isTimerEnabled, setIsTimerEnabled] = useState(false);

  useEffect(() => {
    let interval = null;
    if (isTimerOn && startTime !== null) {
      interval = setInterval(() => {
        setElapsedTime(Math.floor((Date.now() - startTime) / 1000)); //s
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isTimerOn, startTime]);

  const start = () => {
    setStartTime(Date.now() - elapsedTime * 1000);
    setIsTimerOn(true);
  };
  const stop = () => setIsTimerOn(false);
  const reset = () => {
    setElapsedTime(0);
    setIsTimerOn(false);
    setStartTime(null);
  };

  return (
    <TimerContext.Provider
      value={{
        isTimerOn,
        setIsTimerOn,
        elapsedTime,
        setElapsedTime,
        start,
        stop,
        reset,
        isTimerEnabled,
        setIsTimerEnabled,
      }}
    >
      {children}
    </TimerContext.Provider>
  );
}

export function useTimer() {
  return useContext(TimerContext)
}