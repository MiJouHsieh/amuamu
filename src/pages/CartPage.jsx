import { FiShoppingCart } from "react-icons/fi";
import { useCart } from "src/context/CartContext";
import IconCheck from "src/assets/icons/icon-check.svg?react";
import { HiMinusCircle } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

export function CheckCartItem({ className, item, id }) {
  const { toggleChecked, removeFromCart } = useCart();

  return (
    <div className={`${className} flex items-center`}>
      <input
        type="checkbox"
        id={`custom-checkbox-${id}`}
        checked={item.checked}
        onChange={() => toggleChecked(item.name)}
        className="checkboxIconStyle peer relative shrink-0 appearance-none rounded-full border-yellow200 bg-blue800 checked:border-transparent"
      />

      <label
        htmlFor={`custom-checkbox-${id}`}
        className="checkbox-input peer-checked mx-4 flex w-full cursor-pointer items-center text-xl peer-checked:line-through peer-checked:decoration-orange peer-checked:decoration-solid"
      >
        {item.name}
      </label>
      <button type="button" onClick={() => removeFromCart(item.name)} className="activeBtn">
        <HiMinusCircle className="activeIcon text-blue300" />
      </button>
      <IconCheck className="checkboxIconStyle pointer-events-none absolute hidden rounded-full border-orange peer-checked:block" />
    </div>
  );
}

export function CartPage() {
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();

  return (
    <section className="flex w-full justify-center rounded-tl-[150px] rounded-tr-[150px] bg-blue800 bg-[url('/src/assets/images/img-noise.png')] md:text-xl md:leading-9 990:text-2xl 1440:max-w-[1110px]">
      <div className="mx-auto flex min-h-screen w-full max-w-[500px] flex-col items-center justify-start gap-y-10 px-6 py-12 md:max-w-[600px] 990:max-w-[800px]">
        <h1 className="mt-10 font-youngSerif text-4xl text-orange md:text-5xl 990:text-6xl">
          Cart List
        </h1>

        {/* list */}
        <div className="w-full space-y-12 rounded-xl border border-yellow p-6 text-beige">
          {cart && cart.length > 0 ? (
            <>
              <div className="flex w-full flex-col space-y-6 rounded-xl">
                {cart?.map((item) => {
                  return <CheckCartItem key={item.name} id={item.name} item={item} />;
                })}
              </div>
              <button className="submitBtn w-full" onClick={clearCart}>
                clear
              </button>
            </>
          ) : (
            <div className="flex flex-col items-center gap-y-8">
              <FiShoppingCart className="h-24 w-24" alt="Empty cart" />
              <h4 className="text-center text-xl font-medium text-beige">your cart is empty</h4>
              <button className="submitBtn w-full" onClick={() => navigate("/")}>
                Browse Recipes
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
