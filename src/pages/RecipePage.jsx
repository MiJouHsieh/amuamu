import { Checkbox } from "src/components/Checkbox";
import { StepsCards } from "src/components/StepsCards";
import { RECIPE_DATA } from "src/recipe.js";
const imageUrl =
  "https://images.unsplash.com/photo-1638368593117-f87fb4ebeb74?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

export function RecipePage() {
  const ingredients = RECIPE_DATA["ingredients"];
  const note = RECIPE_DATA["note"];

  return (
    <section className="border-box w-full rounded-tl-[150px] rounded-tr-[150px] bg-blue800 bg-[url('/src/assets/images/img-noise.png')] p-4 md:p-10 990:mx-0 990:p-8 1440:max-w-[1110px]">
      <div className="flex w-full flex-col items-center 990:flex-row 990:flex-wrap 990:items-end 990:justify-between">
        {/* 圖片 */}
        <div className="flex w-full flex-1 flex-col items-center justify-center space-y-4 575:mt-4 990:w-[40%]">
          {/* 圖片 */}
          <div className="mt-10">
            <img
              className="h-[300px] w-[300px] rounded-full object-cover object-center 500:rounded-full md:h-[400px] md:w-[400px] 1440:h-[480px] 1440:w-[480px]"
              src={imageUrl}
              alt="food image"
            />
          </div>
          <h1 className="font-youngSerif text-[30px] font-semibold uppercase leading-[40px] tracking-[3px] text-orange opacity-90">
            CHICAGO STYLE HOTDOG
          </h1>
          <div className="flex w-full max-w-[400px] items-center justify-between font-poppins text-beige">
            <p className="flex flex-col items-center justify-between">
              <span className="text-yellow400">Preparation</span>
              <span className="">10 mins</span>
            </p>

            <p className="flex flex-col items-center justify-between">
              <span className="text-yellow400">Cook time</span>
              <span className="">5 mins</span>
            </p>

            <p className="flex flex-col items-center justify-between">
              <span className="text-yellow400">Servings</span>
              <span className="">1</span>
            </p>
          </div>
        </div>
        {/* 材料 */}
        <div className="mt-8 w-full space-y-4 990:ml-10 990:mt-4 990:w-[45%] 990:flex-1">
          <h4 className="text-start font-chocolateClassicalSans text-2xl font-semibold text-yellow400">
            Ingredients
          </h4>
          <div className="990:display-inline space-y-4 rounded-xl border border-yellow p-6 text-beige 990:flex 990:flex-wrap">
            {ingredients.map((item) => {
              return <Checkbox items={item} />;
            })}
          </div>
        </div>
        {/* 材料 2 */}
        <div className="mt-8 w-full space-y-4">
          <h4 className="text-start font-chocolateClassicalSans text-2xl font-semibold text-yellow400">
            Ingredients
          </h4>
          <div className="md:display-inline space-y-4 rounded-xl border border-yellow p-6 text-beige md:flex md:flex-wrap md:space-y-0">
            {ingredients.map((item) => {
              return <Checkbox className="md:p-2" items={item} />;
            })}
          </div>
        </div>
        {/* Note */}
        <div className="mt-6 w-full space-y-3 rounded-xl border border-yellow p-6 md:max-w-none">
          <h4 className="text-start font-chocolateClassicalSans text-[20px] font-semibold leading-[32px] tracking-[0px] text-yellow400">
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
