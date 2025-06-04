import { MdDoneOutline } from "react-icons/md";
import { useState, useEffect } from "react";
import Slider from "react-slick";

export function CookingStepsCards({ instructions, setIsAllStepsDone }) {
  const [stepsStatus, setStepsStatus] = useState(Array(instructions.length).fill(false));

  useEffect(() => {
    const allDone = stepsStatus.every((step) => step === true);

    if (allDone) {
      setIsAllStepsDone(true);
    }
  }, [stepsStatus, setIsAllStepsDone]);

  if (!Array.isArray(instructions) || instructions.length === 0) {
    console.warn("Oops! No instructions found or data format is invalid.");
    return <div className="text-white">No instructions available.</div>;
  }

  const handleClick = (index) => {
    setStepsStatus((prevSteps) => {
      const newSteps = [...prevSteps];
      newSteps[index] = !newSteps[index];
      return newSteps;
    });
  };

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    swipeToSlide: false,
  };
  return (
    <div className="h-full w-full space-y-4 py-6">
      <h4 className="text-start font-chocolateClassicalSans text-2xl font-semibold leading-[32px] tracking-[0px] text-yellow400">
        Instructions
      </h4>

      {/* cards */}
      <div className="h-full w-full rounded-xl border border-yellow p-8">
        <Slider {...settings} className="h-full w-full">
          {instructions.map((item, index) => {
            return (
              <div key={index} className="h-full p-4">
                <div
                  className={`group relative flex h-full cursor-pointer flex-col items-center space-y-6 rounded-3xl bg-beige p-[30px] text-blue800 before:absolute before:inset-0 before:rounded-3xl before:border-4 hover:before:border-yellow200 ${stepsStatus[index] ? "before:border-orange" : "before:border-transparent"} cardHoverShadow cardHoverShadow:hover`}
                  onClick={() => handleClick(index)}
                >
                  <div className="flex w-full items-center justify-between">
                    <span
                      className={`text-nowrap rounded-3xl p-1 px-4 text-xl group-hover:bg-yellow400 ${stepsStatus[index] ? "bg-orange" : "bg-yellow"}`}
                    >{`Step ${index + 1}/${instructions.length}`}</span>
                    <span
                      className={`leading-0 text-6xl font-black 500:text-[90px] ${stepsStatus[index] ? "animate-popIn text-orange" : "text-gray-400 opacity-30"} group-hover:text-orange group-hover:opacity-40`}
                    >
                      <MdDoneOutline />
                    </span>
                  </div>

                  <h5 className="h-full w-full text-base font-semibold md:text-2xl">
                    {item.title}
                  </h5>
                </div>
              </div>
            );
          })}
        </Slider>
      </div>

      <p className="text-5xl text-beige">
        {instructions.length > 0 ? (
          <span>
            {((stepsStatus.filter(Boolean).length / instructions.length) * 100).toFixed(0)}%{" "}
          </span>
        ) : (
          <span>0%</span>
        )}
        Complete
      </p>
    </div>
  );
}
