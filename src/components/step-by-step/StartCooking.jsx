import { useState } from "react";
import { useTimer } from "src/context/TimerContext";

export function StartCooking({ onPrev, onNext }) {
  const [chooseSetting, setChooseSetting] = useState(null);
  const { setIsTimerEnabled, start, stop } = useTimer();

  const handleChoice = (choice) => {
    if (choice === "ok") {
      setIsTimerEnabled(true);
      start();
    } else {
      setIsTimerEnabled(false);
      stop();
    }
    setChooseSetting(choice);
  };

  return (
    <div className="flex w-full flex-col items-center justify-center space-y-4 py-6">
      <div className="w-full rounded-xl border border-yellow bg-blue-200/10 p-6">
        <h4 className="mb-5 w-full text-center font-chocolateClassicalSans text-2xl font-medium text-beige">
          ⏲️ Do you want to use a timer?
        </h4>
        <p className="mt-2 text-center text-sm text-white/70">
          Use a timer to see how long it takes you to complete the recipe!
        </p>
        <div className="flex w-full justify-center gap-x-10 text-base font-semibold">
          <button className="cancelBtn w-24" onClick={() => handleChoice("cancel")}>
            Cancel
          </button>
          <button className="setTimerBtn w-24" onClick={() => handleChoice("ok")}>
            OK
          </button>
        </div>
      </div>

      {chooseSetting !== null ? (
        <div
          className="deleteBtn flex h-40 w-40 cursor-pointer items-center justify-center text-2xl font-semibold"
          onClick={() => onNext()}
        >
          START
        </div>
      ) : (
        <div
          className="deleteBtn flex h-40 w-40 cursor-pointer items-center justify-center text-2xl font-semibold opacity-0"
          onClick={() => onNext()}
        >
          START
        </div>
      )}

      <div className="flex w-full justify-start pt-10">
        <button className="stepByStepBackBtn" onClick={() => onPrev()}>
          Back
        </button>
      </div>
    </div>
  );
}
