import IconCheck from "src/assets/icons/icon-check.svg?react";
import { HiPlusCircle } from "react-icons/hi";
import { useCart } from "src/context/CartContext";

export function Checkbox({ className, items, id }) {
  const {addToCart} = useCart()

  const handleAddToCart = () => {
    addToCart(items);
  }
  return (
    <div className={`${className} flex items-center`}>
      <input
        type="checkbox"
        id={`custom-checkbox-${id}`}
        className="checkboxIconStyle peer relative shrink-0 appearance-none rounded-full border-yellow200 bg-blue800 checked:border-transparent"
      />

      <label
        htmlFor={`custom-checkbox-${id}`}
        className="checkbox-input peer-checked mx-4 flex w-full cursor-pointer items-center text-xl peer-checked:line-through peer-checked:decoration-orange peer-checked:decoration-solid"
      >
        {items}
      </label>
      <HiPlusCircle
        className="activeBtn text-orange"
        type="button"
        onClick={handleAddToCart}
      />
      <IconCheck className="checkboxIconStyle pointer-events-none absolute hidden rounded-full border-orange peer-checked:block" />
    </div>
  );
}
