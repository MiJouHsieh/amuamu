import { IngredientItem } from "src/components/IngredientItem";
export function IngredientCollection({
  ingredients,
  onSave,
  onDelete,
  onChangeMode,
}) {
  return (
    <div className="mx-auto mt-3 w-full pl-2">
      <ol className="w-full list-decimal space-y-2 pl-4 text-yellow200 md:space-y-4">
        {ingredients.map((ingredient) => {
          return (
            <li key={ingredient.id}>
              <IngredientItem
                ingredient={ingredient}
                key={ingredient.id}
                onSave={({ id, title }) => onSave?.({ id, title })}
                onDelete={(id) => onDelete?.(id)}
                onChangeMode={({ id, isEdit }) =>
                  onChangeMode?.({ id, isEdit })
                }
              />
            </li>
          );
        })}
      </ol>
    </div>
  );
}
