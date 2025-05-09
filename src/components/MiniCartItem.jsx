export function MiniCartItem({ ingredient }) {
  return (
    <div className="flex items-center">
      <label
        htmlFor={`custom-checkbox-${ingredient.id}`}
        className="flex w-full cursor-pointer items-center text-lg"
      >
        {ingredient.title}
      </label>
    </div>
  );
}
