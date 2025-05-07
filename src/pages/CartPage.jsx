import { HiLink } from "react-icons/hi";
import { FiShoppingCart } from "react-icons/fi";
import { useCart } from "src/context/CartContext";
import IconCheck from "src/assets/icons/icon-check.svg?react";
import { HiMinusCircle } from "react-icons/hi";
import { useNavigate, Link } from "react-router-dom";
import { IconButton } from "src/components/IconButton";

export function CheckCartItem({ className, ingredient }) {
  const { toggleChecked, removeFromCart } = useCart();
  return (
    <div className={`${className} flex items-center`}>
      <input
        type="checkbox"
        id={`custom-checkbox-${ingredient.id}`}
        checked={ingredient.checked}
        onChange={() => toggleChecked(ingredient.id)}
        className="checkboxIconStyle peer relative shrink-0 appearance-none rounded-full border-yellow200 bg-blue800 checked:border-transparent"
      />
      <label
        htmlFor={`custom-checkbox-${ingredient.id}`}
        className="checkbox-input peer-checked mx-4 flex w-full cursor-pointer items-center text-xl peer-checked:line-through peer-checked:decoration-orange peer-checked:decoration-solid"
      >
        {ingredient.title}
      </label>
      <IconButton
        icon={HiMinusCircle}
        onClick={() => removeFromCart(ingredient.id)}
        color="blue300"
      />
      <IconCheck className="checkboxIconStyle pointer-events-none absolute hidden rounded-full border-orange peer-checked:block" />
    </div>
  );
}

export function CartPage() {
  const { cart, clearCart, checkedCount } = useCart();
  const navigate = useNavigate();
  //分類食譜
  const groupedIngredients = cart.reduce((acc, item) => {
    const key = item.recipe_id;
    if (!acc[key]) {
      acc[key] = {
        recipe_id: item.recipe_id,
        recipe_name: item.recipe_name,
        ingredients: [],
      };
    }
    acc[key].ingredients.push(item);
    return acc;
  }, {});
  const recipeGroup = Object.values(groupedIngredients);

  return (
    <section className="archBackground flex w-full justify-center md:text-xl md:leading-9 990:text-2xl 1440:max-w-[1110px]">
      <div className="mx-auto flex min-h-screen w-full max-w-[500px] flex-col items-center justify-start gap-y-10 px-6 py-12 md:max-w-[600px] 990:max-w-[800px]">
        <h1 className="mt-10 font-youngSerif text-4xl text-orange md:text-5xl 990:text-6xl">
          Cart List
        </h1>
        {cart?.length > 0 && (
          <p className="text-xl text-beige">
            Total: {cart?.length === 1 ? "1 item" : `${cart?.length} items`}
          </p>
        )}

        {/* list */}
        <div className="w-full space-y-12 rounded-xl border border-yellow p-6 text-beige">
          {recipeGroup && recipeGroup.length > 0 ? (
            <>
              {recipeGroup?.map((group) => {
                const ingredientsArr = group.ingredients;
                return (
                  <div key={group.recipe_id}>
                    <Link to={`/recipe-page/${group.recipe_id}`}>
                      <h4 className="cartRecipeName">
                        {group.recipe_name} <HiLink />
                      </h4>
                    </Link>
                    <div className="flex w-full flex-col space-y-6 rounded-xl">
                      {ingredientsArr?.map((ingredient) => {
                        return (
                          <CheckCartItem
                            key={ingredient.id}
                            id={ingredient.id}
                            ingredient={ingredient}
                          />
                        );
                      })}
                    </div>
                  </div>
                );
              })}
              <button className="submitBtn w-full" onClick={clearCart}>
                clear
              </button>
            </>
          ) : (
            <div className="flex flex-col items-center gap-y-8 pt-4">
              <FiShoppingCart className="h-24 w-24" alt="Empty cart" />
              <h4 className="text-center text-xl font-medium text-beige">your cart is empty</h4>
              <button className="submitBtn w-full" onClick={() => navigate("/")}>
                Browse Recipes
              </button>
            </div>
          )}
        </div>

        {/* checkedCount */}
        {cart.length > 0 && (
          <div className="pointer-events-none fixed bottom-4 left-0 z-50 flex w-full justify-center">
            <div className="pointer-events-auto flex items-center gap-x-3 rounded-full bg-orange900/90 px-4 py-3 text-orange shadow-md">
              <IconCheck className="checkedCountIcon pointer-events-none rounded-full border-orange peer-checked:block" />
              {checkedCount()} / {cart.length} {cart.length === 1 ? "item" : "items"}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
