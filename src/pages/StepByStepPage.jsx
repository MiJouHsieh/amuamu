import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles //要加才不會 slide 垂直排列
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "src/supabaseClient";

import { IngredientCheck } from "src/components/step-by-step/IngredientCheck";
import { StartCooking } from "src/components/step-by-step/StartCooking";
import { InstructionSteps } from "src/components/step-by-step/InstructionSteps";
import { FinishPage } from "src/components/step-by-step/FinishPage";

export function StepByStepPage() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [trackDoneSteps, setTrackDoneSteps] = useState(false);

  // 建立 Swiper DOM 的 ref
  const swiperRef = useRef(null);

  const goPrev = () => swiperRef.current?.swiper.slidePrev();
  const goNext = () => swiperRef.current?.swiper.slideNext();

  useEffect(() => {
    async function fetchRecipe() {
      const { data } = await supabase.from("recipe").select("*").eq("id", id).single();
      setRecipe(data);
    }

    fetchRecipe();
  }, [id]);

  if (!recipe) return <div className="text-orange">Loading recipe...</div>;

  return (
    <section className="archBackground h-full min-h-screen w-full p-4 md:p-10 990:mx-0 990:p-8 1440:max-w-[1110px]">
      <div className="mx-auto flex w-full flex-col items-center justify-center gap-y-3 text-white md:max-w-[600px] 990:max-w-[800px]">
        <h4 className="mt-10 text-center font-youngSerif text-[30px] font-semibold uppercase leading-[40px] tracking-[3px] text-orange md:mt-5">
          {recipe?.recipe_name}
        </h4>
        <div className="flex w-full justify-center">
          <Swiper
            ref={swiperRef}
            allowTouchMove={false}
            initialSlide={0}
            centeredSlides={true}
            speed={800}
          >
            {/* Step 0: 食材確認 */}
            <SwiperSlide className="flex min-h-screen items-center justify-center text-center">
              <div className="mx-auto max-w-[500px] py-3">
                <IngredientCheck recipe={recipe} onNext={goNext} />
              </div>
            </SwiperSlide>

            <SwiperSlide className="flex min-h-screen items-center justify-center text-center">
              <div className="mx-auto max-w-[500px] py-3">
                <StartCooking onPrev={goPrev} onNext={goNext} />
              </div>
            </SwiperSlide>

            {/* 動態步驟頁 */}
            {recipe.instructions.map((step, i) => (
              <SwiperSlide key={i}>
                <InstructionSteps
                  recipe={recipe}
                  onNext={goNext}
                  onPrev={goPrev}
                  isLastStep={i === recipe.instructions.length - 1}
                  trackDoneSteps={trackDoneSteps}
                  setTrackDoneSteps={setTrackDoneSteps}
                  index={i}
                />
              </SwiperSlide>
            ))}

            {/* 完成頁 */}
            <SwiperSlide className="flex min-h-screen items-center justify-center text-center">
              <FinishPage recipe={recipe} />
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </section>
  );
}
