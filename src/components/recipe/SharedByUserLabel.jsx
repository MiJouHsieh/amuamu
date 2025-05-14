export function SharedByUserLabel({ loginUserId, recipeUserId }) {
  return (
    <p className="py-4 text-beige">
      Shared by:
      {loginUserId === recipeUserId ? (
        <span className="cursor-default border-b-2 border-transparent pl-2 text-yellow400 transition-all duration-200 hover:border-[#FFD28F]">
          You ✨
        </span>
      ) : (
        <span className="pl-2 text-orange">Amu partners</span>
      )}
    </p>
  );
}
