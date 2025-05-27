import { useState, useEffect, useRef } from "react";

export function CookingTimer() {
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const intervalIdRef = useRef(null);
  const startTimeRef = useRef(0);

  useEffect(() => {
    if (isRunning) {
      intervalIdRef.current = setInterval(() => {
        setElapsedTime(Date.now() - startTimeRef.current);
      }, 10);
    }

    return () => {
      clearInterval(intervalIdRef.current);
    };
  }, [isRunning]);

  function start() {
    setIsRunning(true);
    startTimeRef.current = Date.now() - elapsedTime;
  }

  function stop() {
    setIsRunning(false);
  }

  function reset() {
    setElapsedTime(0);
    setIsRunning(false);
  }

  function formatTime() {
    let hours = Math.floor(elapsedTime / (1000 * 60 * 60));
    let minutes = Math.floor((elapsedTime / (1000 * 60)) % 60);
    let seconds = Math.floor((elapsedTime / 1000) % 60);
    let milliseconds = Math.floor((elapsedTime % 1000) / 10);

    hours = String(hours).padStart(2, "0");
    minutes = String(minutes).padStart(2, "0");
    seconds = String(seconds).padStart(2, "0");
    milliseconds = String(milliseconds).padStart(2, "0");

    return `${hours}:${minutes}:${seconds}:${milliseconds}`;
  }

  return (
    <div className="fixed left-1/2 top-5 z-50 flex -translate-x-1/2 flex-col items-center gap-y-1 text-yellow400">
      <div className="font-chocolateClassicalSans text-lg">{formatTime()}</div>
      <div className="controls flex gap-x-3 text-sm text-beige">
        <button className="start-btn timer-btn" onClick={start}>
          Start
        </button>
        <button className="stop-btn timer-btn" onClick={stop}>
          Stop
        </button>
        <button className="reset-btn timer-btn" onClick={reset}>
          Reset
        </button>
      </div>
    </div>
  );
}
