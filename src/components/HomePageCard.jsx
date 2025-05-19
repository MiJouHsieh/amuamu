import { RecipeImage } from "src/components/RecipeImage";

export const HomePageCard = ({ item }) => {
  return (
    <div className="group flex w-[350px] flex-col items-center gap-3 rounded-2xl bg-white300 py-4 text-white ring-2 ring-white ring-offset-2 md:w-[300px] lg:w-[290px]">
      <div className="h-[250px] w-[300px] overflow-hidden rounded-3xl border-[3px] border-orange600 hover:border-orange md:h-[280px] md:w-[280px]">
        <RecipeImage className="homePageFoodCardImg" src={item?.image} alt={item?.recipe_name} />
      </div>
      <h3 className="text-center text-2xl font-semibold text-blue800">{item.recipe_name}</h3>
      <p className="space-x-2 text-sm text-orange900">
        <span className="inline-flex w-auto items-center gap-x-2 rounded-full bg-beige px-3 py-1">
          ⏱️ {item.preparation.preparationTime}
        </span>
        <span className="inline-flex w-auto items-center gap-x-2 rounded-full bg-beige px-3 py-1">
          🍳 {item.preparation.cookTime}
        </span>
      </p>
    </div>
  );
};
