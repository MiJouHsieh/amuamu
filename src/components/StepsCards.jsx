import { MdDoneOutline } from "react-icons/md";
import { RECIPE_DATA } from "src/recipe.js";
import { useState } from "react";
import Slider from "react-slick";

export function StepsCards() {
  const steps = RECIPE_DATA["steps"];
  const [doneStepsNum, setDoneStepsNum] = useState(0);
  const [stepsStatus, setStepsStatus] = useState(
    Array(steps.length).fill(false),
  );

  const handleClick = (index) => {
    setStepsStatus((prevSteps) => {
      const newSteps = [...prevSteps];
      newSteps[index] = !newSteps[index];
      //計算完成數量
      setDoneStepsNum(newSteps.filter((step) => step).length);
      return newSteps;
    });
  };

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1100,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <div className="mt-6 h-full w-full space-y-6 py-6">
      <h4 className="text-start font-chocolateClassicalSans text-2xl font-semibold leading-[32px] tracking-[0px] text-yellow400">
        Directions
      </h4>

      {/* cards */}
      <div className="h-full w-full rounded-xl border border-yellow p-8">
        <Slider {...settings} className="h-full w-full">
          {steps.map((item, index) => {
            return (
              <div key={index} className="h-full p-4">
                <div
                  className={`group relative flex h-full cursor-pointer flex-col items-center space-y-6 rounded-3xl bg-beige p-[30px] text-blue800 before:absolute before:inset-0 before:rounded-3xl before:border-4 hover:before:border-yellow200 ${stepsStatus[index] ? "before:border-orange" : "before:border-transparent"} cardHoverShadow cardHoverShadow:hover`}
                  onClick={() => handleClick(index)}
                >
                  <div className="flex w-full items-center justify-between">
                    <span
                      className={`text-nowrap rounded-3xl p-1 px-4 text-xl group-hover:bg-yellow400 ${stepsStatus[index] ? "bg-orange" : "bg-yellow"}`}
                    >{`Step ${index + 1}/${steps.length}`}</span>
                    <span
                      className={`leading-0 text-6xl font-black 500:text-[90px] ${stepsStatus[index] ? "animate-popIn text-orange" : "text-gray-400 opacity-30"} group-hover:text-orange group-hover:opacity-40`}
                    >
                      <MdDoneOutline />
                    </span>
                  </div>

                  <h5 className="h-full w-full text-base font-semibold md:text-2xl">
                    {item}
                  </h5>
                </div>
              </div>
            );
          })}
        </Slider>
      </div>

      <p className="text-5xl text-beige">
        {steps.length > 0 ? (
          <span>
            {((doneStepsNum / steps.length) * 100).toFixed(0)}
            %{" "}
          </span>
        ) : (
          <span>0%</span>
        )}
        Complete
      </p>
    </div>
  );
}
