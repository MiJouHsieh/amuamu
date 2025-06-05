import { useTimer } from "src/context/TimerContext";
import { formatTime } from "src/utils/formatTime";

export function CookingTimer() {
  const { elapsedTime, start, stop, reset, isTimerOn } = useTimer();

  return (
    <div className="flex flex-col items-center gap-y-1 text-yellow400">
      <div className="font-chocolateClassicalSans text-lg">{formatTime(elapsedTime)}</div>
      <div className="controls flex gap-x-3 text-sm text-beige">

        {isTimerOn ? (
          <button className="stop-btn timer-btn" onClick={stop}>
            Stop
          </button>
        ) : (
          <button className="start-btn timer-btn" onClick={start}>
            Start
          </button>
        )}

        <button className="reset-btn timer-btn" onClick={reset}>
          Reset
        </button>
      </div>
    </div>
  );
}
