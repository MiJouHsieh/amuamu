import { FaBan } from "react-icons/fa";
import { MdDoneOutline } from "react-icons/md";
import { useState, useEffect, useMemo } from "react";
import Slider from "react-slick";
import { Tooltip } from "src/utils/Tooltip";

export function StepsCards({ instructions, setIsAllStepsDone }) {
  const [stepsStatus, setStepsStatus] = useState(Array(instructions.length).fill(false));
  // 點擊被鎖步驟時，顯示哪一張卡片的提示
  const [activeTooltip, setActiveTooltip] = useState(null);

  // 桌機 hover 時，顯示哪一張卡片的提示
  const [hoveredIndex, setHoveredIndex] = useState(null);

  // 偵測是否為行動裝置（以螢幕寬度與觸控指標為粗略依據）
  const isMobile = useMemo(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia?.("(pointer: coarse)")?.matches ?? window.innerWidth < 768;
  }, []);

  // instructions 變動時重置狀態
  useEffect(() => {
    setStepsStatus(Array(instructions.length).fill(false));
    setActiveTooltip(null);
    setHoveredIndex(null);
  }, [instructions.length]);

  // 回傳給父層（有傳入時才呼叫）
  useEffect(() => {
    const allDone = stepsStatus.every((step) => step === true);
    if (typeof setIsAllStepsDone === "function") {
      setIsAllStepsDone(allDone);
    }
  }, [stepsStatus, setIsAllStepsDone]);

  if (!Array.isArray(instructions) || instructions.length === 0) {
    console.warn("Oops! No instructions found or data format is invalid.");
    return <div className="text-white">No instructions available.</div>;
  }

  const toggleStep = (index) => {
    setStepsStatus((prev) => {
      const next = [...prev];
      next[index] = !next[index];
      return next;
    });
  };

  // 點到被鎖住的卡片：顯示 2 秒提示
  const showLockedTooltip = (index) => {
    setActiveTooltip(index);
    window.setTimeout(() => setActiveTooltip(null), 2000);
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
    <div className="w-full h-full py-6 space-y-4">
      <h4 className="text-start font-chocolateClassicalSans text-2xl font-semibold leading-[32px] tracking-[0px] text-yellow400">
        Instructions
      </h4>

      {/* cards */}
      <div className="w-full h-full p-8 border rounded-xl border-yellow">
        <Slider {...settings} className="w-full h-full">
          {instructions.map((item, index) => {
            const isClickable = index === 0 || stepsStatus[index - 1];
            const showTooltip =
              !isClickable &&
              // 手機：點擊後顯示
              (activeTooltip === index ||
                // 桌機：hover 即顯示
                (!isMobile && hoveredIndex === index));

            return (
              <div key={index} className="h-full p-4">
                <div
                  role="button"
                  tabIndex={0}
                  aria-disabled={!isClickable}
                  className={[
                    "group relative flex h-full flex-col items-center space-y-6 rounded-3xl bg-beige p-[30px] text-blue800 before:absolute before:inset-0 before:rounded-3xl before:border-4",
                    stepsStatus[index] ? "before:border-orange" : "before:border-transparent",
                    isClickable
                      ? "cardHoverShadow cardHoverShadow:hover cursor-pointer hover:before:border-yellow200"
                      : "cursor-not-allowed opacity-90",
                  ].join(" ")}
                  onClick={() => (isClickable ? toggleStep(index) : showLockedTooltip(index))}
                  onKeyDown={(e) => {
                    if (!isClickable) return;
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      toggleStep(index);
                    }
                  }}
                  onMouseEnter={() => !isMobile && !isClickable && setHoveredIndex(index)}
                  onMouseLeave={() => !isMobile && setHoveredIndex(null)}
                >
                  <div className="relative flex items-center justify-between w-full group">
                    <span
                      className={[
                        "text-nowrap rounded-3xl p-1 px-4 text-xl",
                        stepsStatus[index] ? "bg-orange" : "bg-yellow",
                        isClickable && "group-hover:bg-yellow400",
                      ].join(" ")}
                    >{`Step ${index + 1}/${instructions.length}`}</span>
                    <span
                      className={[
                        "leading-0 text-6xl font-black 500:text-[90px]",
                        stepsStatus[index]
                          ? "animate-popIn text-orange"
                          : "text-gray-400 opacity-30",
                        isClickable && "group-hover:text-orange group-hover:opacity-40",
                      ].join(" ")}
                    >
                      <MdDoneOutline />
                    </span>
                    <Tooltip
                      className="absolute inset-x-0 p-2 shadow-md bg-red/80 backdrop-blur-sm"
                      isVisible={showTooltip}
                    >
                      <div className="flex flex-col items-center pt-2 space-y-2 text-sm font-medium tracking-tight text-center text-white md:text-lg">
                        <FaBan className="h-7 w-7 shrink-0" />
                        <p>{`Oops! You’ll need to complete Step ${Math.max(1, index)} first.`}</p>
                      </div>
                    </Tooltip>
                  </div>

                  <h5 className="w-full h-full text-base font-semibold md:text-2xl">
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
