export function MiniCartItem({ ingredient }) {
  return (
    <div className="flex items-center">
      <p className="flex w-full cursor-pointer items-center text-lg">{ingredient.title}</p>
    </div>
  );
}
