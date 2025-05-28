import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
// import required modules
import { Pagination } from "swiper/modules";

import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "src/supabaseClient";
import { Checkbox } from "src/components/Checkbox";
// import { CookingTimer } from "src/components/recipe/CookingTimer";

export function IngredientCheck({ recipe, onNext }) {
  const navigate = useNavigate();
  return (
    <div className="flex w-full flex-col justify-center space-y-4 py-6">
      <h4 className="w-full text-start font-chocolateClassicalSans text-2xl font-semibold text-yellow400">
        Ingredients
      </h4>

      <div className="flex w-full flex-col space-y-4 rounded-xl border border-yellow p-6 text-beige">
        {recipe?.ingredients?.map((item) => {
          return (
            <Checkbox
              className="text-start md:p-2"
              itemTitle={item.title}
              key={item.id}
              id={item.id}
              recipeName={recipe.recipe_name}
              recipeId={recipe.id}
              recipeImage={recipe.image}
            />
          );
        })}
      </div>
      <div className="flex justify-between pt-10">
        <button onClick={() => navigate(`/recipe-page/${recipe?.id}`)}>Back to Recipe</button>
        <button onClick={() => onNext()}>Next</button>
      </div>
    </div>
  );
}

export function StepByStepPage() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  // const [checkedIngredients, setCheckedIngredients] = useState([]);

  useEffect(() => {
    // 清空前一筆狀態
    // setCheckedIngredients([]);
    // setStartTime(null);
    // setTimerOn(false);

    // fetch 新資料
    async function fetchRecipe() {
      const { data } = await supabase.from("recipe").select("*").eq("id", id).single();
      console.log("MARRA DATA", data);
      setRecipe(data);
    }

    fetchRecipe();
  }, [id]);

  // const [startTime, setStartTime] = useState(null);
  // const [timerOn, setTimerOn] = useState(false);
  const swiperRef = useRef(null);

  // const goPrev = () => swiperRef.current?.swiper.slidePrev();
  const goNext = () => swiperRef.current?.swiper.slideNext();

  if (!recipe) return <div className="text-orange">Loading recipe...</div>;

  return (
    <section className="archBackground border-box h-full min-h-screen w-full p-4 md:p-10 990:mx-0 990:p-8 1440:max-w-[1110px]">
      <div className="mx-auto flex w-full flex-col items-center justify-center gap-y-3 px-6 text-white md:max-w-[600px] 990:max-w-[800px]">
        <h4 className="mt-10 font-youngSerif text-[30px] font-semibold uppercase leading-[40px] tracking-[3px] text-orange opacity-90 md:mt-5">
          {recipe?.recipe_name}
        </h4>
        <div className="flex w-full justify-center">
          <Swiper
            modules={[Pagination]}
            grabCursor={true}
            initialSlides={2}
            centeredSlides={true}
            slidesPerView="auto"
            speed={800}
            slideToClickedSlide={true}
            pagination={{ el: ".swiper-pagination", clickable: true }}
          >
            {/* Step 0: 食材確認 */}
            <SwiperSlide className="flex min-h-screen items-center justify-center text-center">
              <div className="mx-auto max-w-[500px] bg-blue-200/10 py-3">
                <IngredientCheck recipe={recipe} onNext={goNext} />
              </div>
            </SwiperSlide>

            <SwiperSlide className="swiper-slide slide-1 flex min-h-screen items-center justify-center bg-yellow/30 text-center">
              <h1>Slide 2</h1>
              {/* <StartCooking
//               onNext={() => {
//                 if (timerOn) setStartTime(Date.now());
//                 goNext();
//               }}
//               timerOn={timerOn}
//               setTimerOn={setTimerOn}
//             /> */}
            </SwiperSlide>

            {/* 動態步驟頁（step 1 ~ 3） */}
            {/* {recipe.instructions.map((step, i) => (
//             <SwiperSlide key={i}>
//               <h1>InstructionStep</h1>

//               {/* <InstructionStep
//                 index={i}
//                 total={recipe.instructions.length}
//                 stepData={step}
//                 onNext={goNext}
//                 onPrev={goPrev}
//               /> */}
            {/*   </SwiperSlide>
//           ))} */}

            {/* 完成頁 */}
            <SwiperSlide className="swiper-slide slide-1 flex min-h-screen items-center justify-center bg-green-200/30 text-center">
              Slide 3
              {/* <FinishPage
//               recipeName={recipe?.recipe_name}
//               duration={timerOn ? Math.floor((Date.now() - startTime) / 1000) : null}
//               onPrev={goPrev}
//             /> */}
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </section>
  );
}
