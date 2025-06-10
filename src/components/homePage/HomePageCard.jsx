import { RecipeImage } from "src/components/RecipeImage";
import { AddAllFoodToCart } from "src/components/homePage/AddAllFoodToCart";
import { useCart } from "src/context/CartContext";
import toast, { Toaster } from "react-hot-toast";

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
    toast.success("All ingredients added to cart!", {
      style: {
        border: "1px solid #62381F",
        padding: "16px",
        color: "#62381F",
        background: "#DFCFB4",
      },
      iconTheme: {
        primary: "#62381F",
        secondary: "#F9F8F3",
      },
    });
  };

  return (
    <div className="group/card flex w-[350px] flex-col items-center gap-3 rounded-2xl bg-white300 py-4 text-white ring-2 ring-white ring-offset-2 md:w-[300px] lg:w-[290px]">
      <div className="h-[250px] w-[300px] overflow-hidden rounded-3xl border-[3px] border-orange600 group-hover/card:border-orange md:h-[280px] md:w-[280px]">
        <RecipeImage className="homePageFoodCardImg" src={item?.image[0]} alt={item?.recipe_name} />
      </div>
      <h3 className="w-full max-w-[280px] truncate text-center text-2xl font-semibold text-blue800">
        {item.recipe_name}
      </h3>
      <div className="flex items-center justify-between gap-x-2 text-sm text-orange900">
        <p className="inline-flex flex-col items-center px-2 py-1">
          <span>Prep time</span>
          <span className="font-bold">{item.preparation.preparationTime} mins</span>
        </p>

        <p className="inline-flex flex-col items-center px-2 py-1">
          <span>Cook time</span>
          <span className="font-bold">{item.preparation.cookTime} mins</span>
        </p>
        <AddAllFoodToCart onClick={handleAddAllFoodToCart} />
        <Toaster />
      </div>
    </div>
  );
};
