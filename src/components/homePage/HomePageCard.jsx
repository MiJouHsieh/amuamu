import { RecipeImage } from "src/components/RecipeImage";
import { AddAllFoodToCart } from "src/components/homePage/AddAllFoodToCart";
import { useCart } from "src/context/CartContext";

export const HomePageCard = ({ item }) => {
  const { addToCart } = useCart();
  const handleAddAllFoodToCart = (e) => {
    item.ingredients.map((ingredient) => {
      e.stopPropagation();
      e.preventDefault();
      addToCart({
        id: ingredient.id,
        title: ingredient.title,
        recipe_id: item.id,
        recipe_name: item.recipe_name,
        recipe_image: item.image,
        checked: false,
      });
    });
  };

  return (
    <div className="group/card flex w-[350px] flex-col items-center gap-3 rounded-2xl bg-white300 py-4 text-white ring-2 ring-white ring-offset-2 md:w-[300px] lg:w-[290px]">
      <div className="h-[250px] w-[300px] overflow-hidden rounded-3xl border-[3px] border-orange600 group-hover/card:border-orange md:h-[280px] md:w-[280px]">
        <RecipeImage className="homePageFoodCardImg" src={item?.image} alt={item?.recipe_name} />
      </div>
      <h3 className="text-center text-2xl font-semibold text-blue800">{item.recipe_name}</h3>
      <div className="flex items-center space-x-2 text-sm text-orange900">
        <p className="inline-flex w-auto flex-col items-center gap-x-2 px-3 py-1">
          <span className="">Prep time</span>
          <span className="font-bold">{item.preparation.preparationTime}</span>
        </p>

        <p className="inline-flex w-auto flex-col items-center gap-x-2 px-3 py-1">
          <span className="">Cook time</span>
          <span className="font-bold">{item.preparation.cookTime}</span>
        </p>
        <AddAllFoodToCart onClick={handleAddAllFoodToCart} />
      </div>
    </div>
  );
};
