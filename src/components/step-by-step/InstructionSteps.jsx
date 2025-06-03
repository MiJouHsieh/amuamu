import { CookingStepsCards } from "src/components/step-by-step/CookingStepsCards";

export function InstructionSteps({ recipe, onPrev, onNext, isAllStepsDone, setIsAllStepsDone }) {
  return (
    <div className="flex w-full flex-col items-center justify-center space-y-4 py-6">
      <CookingStepsCards instructions={recipe.instructions} setIsAllStepsDone={setIsAllStepsDone} />

      <div className="flex w-full justify-between pt-10">
        <button className="stepByStepBackBtn" onClick={() => onPrev()}>
          Back
        </button>
        {isAllStepsDone && (
          <button className="stepByStepNextBtn" onClick={() => onNext()}>
            Done
          </button>
        )}
      </div>
    </div>
  );
}
