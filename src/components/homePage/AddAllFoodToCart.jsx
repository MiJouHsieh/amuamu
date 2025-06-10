import { FiShoppingCart } from "react-icons/fi";

export function AddAllFoodToCart({ onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="scale-1 group relative transform rounded-full bg-beige p-3 transition-all hover:ring-2 hover:ring-orange/90 active:scale-[1.2]"
    >
      <FiShoppingCart className="activeIcon h-6 w-6 text-orange900" />
      <span className="absolute -left-5 -top-12 scale-0 transform rounded bg-orange/90 px-2 py-1 text-xs text-blue800 transition duration-100 group-hover:scale-100">
        Add All Ingredients
      </span>
    </button>
  );
}
