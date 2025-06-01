import { CookingStepsCards } from "src/components/step-by-step/CookingStepsCards";
import { useSwiperSlide } from "swiper/react";
import { useEffect } from "react";

export function InstructionSteps({
  recipe,
  onPrev,
  onNext,
  isLastStep,
  trackDoneSteps,
  setTrackDoneSteps,
  index
}) {
  
  const { isActive } = useSwiperSlide();
  useEffect(() => {
    if (isActive) {
      console.log("✅ ACTIVE slide");
      console.log("trackDoneSteps", trackDoneSteps);
      console.log("isLastStep", isLastStep);
      console.log("index", index);
    }
  }, [isActive]);
  return (
    <div className="flex w-full flex-col items-center justify-center space-y-4 py-6">
      <CookingStepsCards
        instructions={recipe.instructions}
        setTrackDoneSteps={() => setTrackDoneSteps(true)}
      />

      <div className="flex w-full justify-between pt-10">
        <button className="stepByStepBackBtn" onClick={() => onPrev()}>
          Back
        </button>
        {isActive && trackDoneSteps && isLastStep && (
          <button className="stepByStepNextBtn" onClick={() => onNext()}>
            Done
          </button>
        )}
      </div>
    </div>
  );
}
