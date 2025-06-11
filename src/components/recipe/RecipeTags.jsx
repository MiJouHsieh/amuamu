export function RecipeTags({ tagArray = [] }) {
  return (
    Array.isArray(tagArray) &&
    tagArray.length > 0 && (
      <div className="w-full space-y-4 py-6 990:flex 990:items-center 990:justify-center 990:space-x-4 990:space-y-0">
        <h4 className="font-chocolateClassicalSans text-2xl font-semibold text-yellow400">Tags</h4>
        <div className="h-full space-x-2 space-y-2 text-beige/90">
          {tagArray?.map((tag) => {
            return (
              <span className="inline-block rounded-full bg-blue500/50 px-4 py-2 text-xl" key={tag}>
                {tag}
              </span>
            );
          })}
        </div>
      </div>
    )
  );
}
