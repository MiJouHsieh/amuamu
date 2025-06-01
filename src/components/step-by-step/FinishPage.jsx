import { useNavigate } from "react-router-dom";
import { useConfetti } from "src/hooks/useConfetti";
import { useEffect } from "react";
import { useSwiperSlide } from "swiper/react";

export function FinishPage({ recipe }) {
  const navigate = useNavigate();
  const { triggerConfetti } = useConfetti();
  const { isActive } = useSwiperSlide();
  useEffect(() => {
    if (isActive) {
      triggerConfetti();
    }
  }, [isActive]);

  return (
    <div className="flex w-full flex-col items-center justify-center space-y-4 py-6">
      <h4 className="mb-5 w-full space-y-5 text-center font-chocolateClassicalSans text-2xl font-medium text-beige">
        🎉 Congrats! You've finished it! 🎉
      </h4>
      <div className="flex w-full justify-center pt-10">
        <button
          className="stepByStepNextBtn"
          onClick={() => navigate(`/recipe-page/${recipe?.id}`)}
        >
          Back to Recipe
        </button>
      </div>
    </div>
  );
}