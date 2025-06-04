import Slider from "react-slick";

const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1100,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
        initialSlide: 2,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
  ],
};

export function RecipeImageCarousel({ imageArray = [] }) {
  return (
    Array.isArray(imageArray) &&
    imageArray.length > 1 && (
      <div className="mt-4 h-full w-full rounded-xl border border-yellow/20 p-4">
        <Slider {...settings} className="h-full w-full">
          {imageArray.map((src, index) => (
            <img
              key={index}
              src={src}
              alt={`Preview ${index}`}
              className="h-[150px] w-[150px] rounded-md object-cover px-2"
            />
          ))}
        </Slider>
      </div>
    )
  );
}
