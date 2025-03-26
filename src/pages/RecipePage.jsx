import { Checkbox } from "src/components/Checkbox";
import { StepsCards } from "src/components/StepsCards";
import { RECIPE_DATA } from "src/recipe.js";
const imageUrl =
  "https://images.unsplash.com/photo-1638368593117-f87fb4ebeb74?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

export function RecipePage() {
  const ingredients = RECIPE_DATA["ingredients"];
  const note = RECIPE_DATA["note"];

  return (
    <section className="mx-4 rounded-tl-[150px] rounded-tr-[150px] bg-teal500 p-4 990:mx-10 990:p-8">
      <div className="flex w-full flex-col items-center 990:flex-row 990:flex-wrap 990:items-start 990:justify-around">
        {/* 圖片 */}
        <div className="flex w-full max-w-[450px] flex-col items-center justify-center space-y-4 outline 575:mt-4 990:w-[40%]">
          {/* 圖片 */}
          <div className="">
            <img
              className="h-[300px] w-[300px] rounded-full object-cover object-center 500:rounded-[80px] 575:h-[400px] 575:w-[400px] 575:rounded-[80px] md:h-[300px] md:w-[300px] 1440:h-[480px] 1440:w-[480px]"
              src={imageUrl}
              alt="food image"
            />
          </div>
          <h1 className="font-semi-bold font-youngSerif text-[30px] uppercase leading-[40px] tracking-[0px] text-white opacity-90">
            CHICAGO STYLE HOTDOG
          </h1>
          <div className="flex w-full max-w-[400px] items-center justify-between font-poppins text-white">
            <p className="flex flex-col items-center justify-between">
              <span className="text-teal">Preparation</span>
              <span className="">10 mins</span>
            </p>

            <p className="flex flex-col items-center justify-between">
              <span className="text-teal">Cook time</span>
              <span className="">5 mins</span>
            </p>

            <p className="flex flex-col items-center justify-between">
              <span className="text-teal">Servings</span>
              <span className="">1</span>
            </p>
          </div>
        </div>
        {/* 材料 */}
        <div className="mt-6 w-full max-w-[450px] space-y-3 outline outline-blue-300 990:mt-4 990:w-[45%]">
          <h4 className="font-semi-bold text-start font-chocolateClassicalSans text-[20px] leading-[32px] tracking-[0px] text-yellow400">
            Ingredients
          </h4>
          <div className="990:display-inline space-y-4 pl-2 text-beige 990:flex 990:flex-wrap">
            {ingredients.map((item) => {
              return <Checkbox items={item} />;
            })}
          </div>
        </div>
        {/* 材料 2 */}
        <div className="mt-6 w-full space-y-3 outline outline-blue-300">
          <h4 className="font-semi-bold text-start font-chocolateClassicalSans text-[20px] leading-[32px] tracking-[0px] text-yellow400">
            Ingredients
          </h4>
          <div className="md:display-inline space-y-4 pl-2 text-beige md:flex md:flex-wrap md:space-y-0">
            {ingredients.map((item) => {
              return <Checkbox className="p-2" items={item} />;
            })}
          </div>
        </div>
        {/* Note */}
        <div className="mt-6 w-full space-y-3 outline outline-blue-300 md:max-w-none">
          <h4 className="font-semi-bold text-start font-chocolateClassicalSans text-[20px] leading-[32px] tracking-[0px] text-yellow400">
            Note
          </h4>
          <p className="pl-2 text-beige">{note}</p>
        </div>
        {/* Steps */}
        <StepsCards />
      </div>
    </section>
  );
}
