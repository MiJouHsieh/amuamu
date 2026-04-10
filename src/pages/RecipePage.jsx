import { Checkbox } from "src/components/Checkbox";
import { StepsCards } from "src/components/StepsCards";
import { SlideOverPanel } from "src/components/SlideOverPanel";
import { MiniCartItem } from "src/components/MiniCartItem";
import { MessageModal } from "src/components/MessageModal";
import { CartIconToggle } from "src/components/recipe/CartIconToggle";
import { RecipeImage } from "src/components/RecipeImage";
import { SharedByUserLabel } from "src/components/recipe/SharedByUserLabel";
import { RecipeImageCarousel } from "src/components/recipe/RecipeImageCarousel";
import { RecipeTags } from "src/components/recipe/RecipeTags";
import { StepByStepBtn } from "src/components/recipe/StepByStepBtn";

import { useParams, useNavigate, Link } from "react-router-dom";
import { useState, useEffect, useRef, useMemo } from "react";
import { supabase } from "src/supabaseClient";
import { useAuth } from "src/context/AuthContext";
import { useCart } from "src/context/CartContext";
import { HiLink } from "react-icons/hi";

export function RecipePage() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();
  const [showMiniCart, setShowMiniCart] = useState(false);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const cartRef = useRef(null);
  const [latestItemTitle, setLatestItemTitle] = useState("");
  const [isNewItem, setIsNewItem] = useState(true);
  const { cart } = useCart();
  const hasCartItems = (cart ?? []).length > 0;

  const recipeGroup = useMemo(() => {
    const groupedIngredients = (cart ?? []).reduce((acc, item) => {
      const key = item.recipe_id;
      if (!acc[key]) {
        acc[key] = {
          recipe_id: item.recipe_id,
          recipe_name: item.recipe_name,
          recipe_image: item.recipe_image,
          ingredients: [],
        };
      }
      acc[key].ingredients.push(item);
      return acc;
    }, {});

    return Object.values(groupedIngredients);
  }, [cart]);

  const [isAllStepsDone, setIsAllStepsDone] = useState(false);

  const handleClickAddBtn = (title, isNew) => {
    setLatestItemTitle(title);
    setIsNewItem(isNew);
    setShowMessageModal(true);
  };
  const handleToggleCart = () => {
    setShowMiniCart((prev) => !prev);
  };
  useEffect(() => {
    const getRecipe = async () => {
      setLoading(true);
      setData(null);
      try {
        const { data, error, status } = await supabase
          .from("recipe")
          .select("*")
          .eq("id", id)
          .single();

        if (error && status !== 406) {
          console.log("error", error);
          throw error;
        }
        setData(data);
      } catch (error) {
        console.error("An error occurred while loading the post.", error);
        setData(null);
      } finally {
        setLoading(false);
      }
    };
    getRecipe();
  }, [id]);

  useEffect(() => {
    function handleOutsideClick(event) {
      if (cartRef.current && !cartRef.current.contains(event.target)) {
        setShowMiniCart(false);
      }
    }
    if (showMiniCart) {
      document.addEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [showMiniCart]);

  if (loading) {
    return <div className="p-3 mt-48 text-3xl text-orange">Loading...</div>;
  }

  if (!data) {
    return (
      <div className="flex px-4 py-2 mt-48 text-3xl border-2 rounded-lg border-orange text-orange">
        Recipe not found.💔
      </div>
    );
  }

  return (
    <section className="archBackground border-box h-full w-full p-4 md:p-10 990:mx-0 990:p-8 1440:max-w-[1110px]">
      <div className="flex flex-col items-center w-full 990:flex-row 990:flex-wrap 990:items-end 990:justify-between">
        {/* image */}
        <div className="flex w-full flex-1 flex-col items-center justify-center space-y-4 575:mt-4 990:w-[40%]">
          <div className="mt-10">
            <RecipeImage
              className="h-[300px] w-[300px] rounded-full object-cover object-center 500:rounded-full md:h-[400px] md:w-[400px] 1440:h-[480px] 1440:w-[480px]"
              src={data?.image?.[0] ?? ""}
              alt={data.recipe_name}
            />
          </div>
          <RecipeImageCarousel imageArray={data?.image ?? []} />

          <SharedByUserLabel loginUserId={user?.id} recipeUserId={data.user_id} />
          {/* user edit delete */}
          {user?.id === data.user_id && (
            <div className="flex items-center justify-center w-full gap-10 text-blue100">
              <button
                className="actionBtn:hover actionBtn rounded-xl"
                onClick={() => navigate(`/edit/${id}`)}
              >
                Edit
              </button>
            </div>
          )}
          <h1 className="font-youngSerif text-[30px] font-semibold uppercase leading-[40px] tracking-[3px] text-orange opacity-90">
            {data.recipe_name}
          </h1>
          <div className="flex w-full max-w-[400px] items-center justify-between font-poppins text-lg text-beige">
            <p className="flex flex-col items-center justify-between">
              <span className="text-yellow400">Preparation</span>
              <span>{data?.preparation?.preparationTime ?? "Preparation Time ?"}</span>
            </p>

            <p className="flex flex-col items-center justify-between">
              <span className="text-yellow400">Cook time</span>
              <span>{data?.preparation?.cookTime ?? "Cook Time ?"}</span>
            </p>

            <p className="flex flex-col items-center justify-between">
              <span className="text-yellow400">Servings</span>
              <span>{data?.preparation?.servings ?? "Servings ?"}</span>
            </p>
          </div>
        </div>
        {/* Tags */}
        <RecipeTags tagArray={data?.tags ?? []} />

        {/* Step-by-step mode */}
        <StepByStepBtn id={id} />

        {/* ingredients  */}
        <div className="w-full py-6 space-y-4">
          <div className="flex justify-between">
            <h4 className="text-2xl font-semibold text-start font-chocolateClassicalSans text-yellow400">
              Ingredients
            </h4>
            <CartIconToggle onClick={handleToggleCart} />
          </div>

          <div className="p-6 space-y-4 border rounded-xl border-yellow text-beige md:flex md:flex-wrap md:space-y-0">
            {data?.ingredients?.length > 0 ? (
              data.ingredients.map((item) => {
                return (
                  <Checkbox
                    className="md:p-2"
                    itemTitle={item.title}
                    key={item.id}
                    id={item.id}
                    recipeName={data.recipe_name}
                    recipeId={data.id}
                    recipeImage={data.image?.[0] ?? ""}
                    onClickShowCartModal={handleClickAddBtn}
                  />
                );
              })
            ) : (
              <p className="w-full text-beige/80">No ingredients yet.</p>
            )}
          </div>
        </div>
        {/* instructions */}
        {data?.instructions?.length > 0 ? (
          <StepsCards
            instructions={data.instructions}
            isAllStepsDone={isAllStepsDone}
            setIsAllStepsDone={setIsAllStepsDone}
          />
        ) : (
          <div className="w-full p-6 mt-6 space-y-3 border rounded-xl border-yellow">
            <h4 className="text-start font-chocolateClassicalSans text-2xl font-semibold leading-[32px] tracking-[0px] text-yellow400">
              Instructions
            </h4>
            <p className="pl-2 text-beige">No instructions yet.</p>
          </div>
        )}
        {/* Note */}
        <div className="w-full p-6 mt-6 space-y-3 border rounded-xl border-yellow md:max-w-none">
          <h4 className="text-start font-chocolateClassicalSans text-2xl font-semibold leading-[32px] tracking-[0px] text-yellow400">
            Note
          </h4>
          <p className="pl-2 text-beige">{data?.note?.trim() ? data.note : "No note yet."}</p>
        </div>
      </div>
      {/* mini cart */}
      {showMiniCart && (
        <SlideOverPanel ref={cartRef} onClose={handleToggleCart}>
          {hasCartItems ? (
            <>
              <p className="w-full text-xl text-center text-beige">
                Total: {cart?.length === 1 ? "1 item" : `${cart?.length} items`}
              </p>
              {recipeGroup.map((group) => {
                const ingredientsArr = group.ingredients;
                return (
                  <div
                    key={group.recipe_id}
                    className="w-full p-2 space-y-4 border rounded-xl border-yellow text-beige"
                  >
                    <div className="flex flex-col">
                      <Link to={`/recipe-page/${group.recipe_id}`}>
                        <h4 className="miniCartRecipeName">
                          {group.recipe_name} <HiLink />
                        </h4>
                      </Link>
                      <div>
                        <RecipeImage
                          className="h-[100px] w-[100px] rounded-full object-cover object-center 1440:h-[150px] 1440:w-[150px]"
                          src={group.recipe_image ?? ""}
                          alt={group.recipe_name}
                        />
                      </div>
                    </div>

                    <div className="flex flex-col w-full space-y-6 rounded-xl">
                      {ingredientsArr.map((ingredient) => {
                        return (
                          <MiniCartItem
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
              <button className="w-full submitBtn" onClick={() => navigate("/cart")}>
                Check My Cart
              </button>
            </>
          ) : (
            <p className="w-full text-center text-beige">Your cart is empty.</p>
          )}
        </SlideOverPanel>
      )}
      {/* message  modal */}
      {showMessageModal && (
        <MessageModal onClose={() => setShowMessageModal(false)} autoClose={true}>
          {isNewItem ? (
            <>
              <p className="font-semibold text-orange">{`🎉 ${latestItemTitle}`}</p>
              <p>added to cart!</p>
            </>
          ) : (
            <>
              <p className="text-blue100">{`🛒 ${latestItemTitle}`}</p>
              <p className="text-blue100">is already in your cart.</p>
            </>
          )}
        </MessageModal>
      )}
    </section>
  );
}
