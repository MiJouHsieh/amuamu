import { FiShoppingCart } from "react-icons/fi";

export function CartIconToggle({ onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="scale-1 group relative mr-6 transform transition-all hover:scale-[1.2]"
    >
      <FiShoppingCart className="activeIcon h-6 w-6 text-orange" />
      <span className="absolute -left-5 -top-12 scale-0 transform rounded bg-orange/90 px-2 py-1 text-xs text-blue800 transition group-hover:scale-100">
        Cart Preview
      </span>
    </button>
  );
}
