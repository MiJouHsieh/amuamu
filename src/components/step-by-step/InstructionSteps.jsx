import { CookingStepsCards } from "src/components/step-by-step/CookingStepsCards";
import { CookingTimer } from "src/components/step-by-step/CookingTimer";
import { useTimer } from "src/context/TimerContext";

export function InstructionSteps({ recipe, onPrev, onNext, isAllStepsDone, setIsAllStepsDone }) {
  const { isTimerEnabled, stop } = useTimer();

  return (
    <div className="flex w-full flex-col items-center justify-center space-y-4 py-6">
      <CookingStepsCards instructions={recipe.instructions} setIsAllStepsDone={setIsAllStepsDone} />
      {isTimerEnabled && <CookingTimer />}
      <div className="flex w-full justify-between pt-10">
        <button className="stepByStepBackBtn" onClick={() => onPrev()}>
          Back
        </button>

        {isAllStepsDone ? (
          <button
            className="stepByStepNextBtn"
            onClick={() => {
              if (isTimerEnabled) stop();
              onNext();
            }}
          >
            Done
          </button>
        ) : (
          <button className="disabled-done-btn cursor-not-allowed" disabled>
            Done
          </button>
        )}
      </div>
    </div>
  );
}
